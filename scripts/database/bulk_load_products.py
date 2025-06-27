# File: scripts/database/bulk_load_products.py
# pip install psycopg2-binary python-dotenv
import os
import json
import psycopg2
import sys
from decimal import Decimal
from dotenv import load_dotenv
from urllib.parse import urlparse

# Get the project root directory
project_root = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
# Load environment variables from .env file at the project root
load_dotenv(os.path.join(project_root, '.env'))

def parse_db_url(url):
    """Parses a database URL into a dictionary of connection parameters."""
    result = urlparse(url)
    return {
        'dbname': result.path[1:],
        'user': result.username,
        'password': result.password,
        'host': result.hostname,
        'port': result.port
    }

def get_db_connection():
    """Establishes a connection to the PostgreSQL database."""
    try:
        db_url = os.getenv('DATABASE_URL')
        if not db_url:
            raise ValueError("DATABASE_URL environment variable not set.")
        
        conn_params = parse_db_url(db_url)
        conn = psycopg2.connect(**conn_params)
        return conn
    except Exception as e:
        print(f"Error connecting to the database: {e}", file=sys.stderr)
        sys.exit(1)

def load_products(conn, products_data):
    """Loads a list of products into the database transactionally."""
    with conn.cursor() as cur:
        for product in products_data:
            try:
                print(f"Processing product: {product['name']}...")

                # First, ensure the category exists and get its ID
                cur.execute(
                    """
                    INSERT INTO "Category" (id, name, slug, "createdAt", "updatedAt", "isActive")
                    VALUES (gen_random_uuid(), %s, %s, NOW(), NOW(), TRUE)
                    ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name
                    RETURNING id;
                    """,
                    (product['category']['name'], product['category']['slug'])
                )
                category_id = cur.fetchone()[0]
                print(f"  ✓ Upserted category '{product['category']['name']}' with ID: {category_id}")

                # Delete existing product with the same SKU for clean import
                cur.execute('DELETE FROM "Product" WHERE sku = %s;', (product['sku'],))

                # Insert the main product record
                cur.execute(
                    """
                    INSERT INTO "Product" (id, sku, name, slug, description, "shortDescription", price, "isActive", "isFeatured", "categoryId", "createdAt", "updatedAt")
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW(), NOW())
                    RETURNING id;
                    """,
                    (
                        product['id'], product['sku'], product['name'], product['slug'],
                        product.get('description', ''), product.get('shortDescription', ''),
                        Decimal(product['price']), product.get('isActive', True),
                        product.get('isFeatured', False), category_id
                    )
                )
                product_id = cur.fetchone()[0]
                print(f"  ✓ Inserted product with ID: {product_id}")

                # Insert variants
                for variant in product.get('variants', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductVariant" ("id", "productId", sku, name, price, "inventoryQuantity", "createdAt", "updatedAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, %s, NOW(), NOW());
                        """,
                        (
                            product_id, variant['sku'], variant['name'],
                            Decimal(variant['price']), variant['inventoryQuantity']
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('variants', []))} variant(s).")

                # Insert images
                for image in product.get('images', []):
                    cur.execute(
                        """
                        INSERT INTO "ProductImage" ("id", "productId", url, "altText", "isPrimary", "createdAt")
                        VALUES (gen_random_uuid(), %s, %s, %s, %s, NOW());
                        """,
                        (
                            product_id, image['url'], image.get('altText', ''),
                            image.get('isPrimary', False)
                        )
                    )
                print(f"  ✓ Inserted {len(product.get('images', []))} image(s).")
                
                # Commit the transaction for this product
                conn.commit()
                print(f"✅ Successfully loaded {product['name']}.\n")

            except Exception as e:
                print(f"❌ Error loading product '{product.get('name', 'N/A')}': {e}", file=sys.stderr)
                conn.rollback() # Rollback the transaction for the failed product

def main():
    """Main function to run the script."""
    json_path = os.path.join(project_root, 'bulk_load_products.json')
    
    if not os.path.exists(json_path):
        print(f"Error: JSON file not found at {json_path}", file=sys.stderr)
        sys.exit(1)
        
    with open(json_path, 'r') as f:
        products_to_load = json.load(f)

    conn = get_db_connection()
    try:
        load_products(conn, products_to_load)
    finally:
        conn.close()
        print("Database connection closed.")

if __name__ == '__main__':
    main()
