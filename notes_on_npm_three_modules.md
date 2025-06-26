Here’s what’s happening: the latest @react-three/fiber (v9.x) now requires React 19, but Expo 53.0.12 still bundles React 18.3.1, so npm refuses to mix them.

**Solution A: stick with the v8 line (React 18-compatible)**  
1. Uninstall any half-installed versions:  
   ```bash
   npm uninstall @react-three/fiber @react-three/drei
   ```  
2. Install the last v8 release and a matching Drei build:  
   ```bash
   npm install @react-three/fiber@8.17.10 @react-three/drei@9.115.0
   ```  
   • @react-three/fiber@8.x pairs with React 18  
   • @react-three/drei@9.x is the Drei “major” that targets fiber 8  

**Solution B: force-ignore the peer conflict**  
If you really want to try v9 on React 18 (risky), you can bypass peer checks:  
```bash
npm install @react-three/fiber @react-three/drei --legacy-peer-deps
```  
…but be prepared for runtime glitches.

**Solution C: upgrade React/Expo**  
Fiber 9 requires React 19. You’d need an Expo SDK that ships React 19 (not out yet), or eject to a bare RN workflow where you manually bump React.

––––––––––––––––––––––––––––––––––––––––––––––––––––––  
Want to keep Expo but get fiber 9? You could:  
• Watch for Expo SDK 55+ (when React 19 lands).  
• Or shadow-patch your Metro/RN setup—advanced territory.  

---
Sweet—you’ve got @react-three/fiber 8.x and drei 9.x installed, so now let’s wire it up in your Next.js app.

1. Bump three-mesh-bvh (optional)  
   The warning about `three-mesh-bvh@0.7.8` simply means it isn’t fully compatible with three@0.177. You can upgrade to v0.8.0:  
   ```bash
   npm install three-mesh-bvh@0.8.0
   ```

2. Prevent SSR on your 3D canvas  
   Three.js needs a DOM; Next.js will try to server-render your Canvas unless you tell it not to. In the page or component that holds your scene, wrap it in a dynamic import:  
   ```tsx
   // pages/index.tsx
   import dynamic from 'next/dynamic';

   // load the React-Three component only on the client
   const ThreeScene = dynamic(() => import('../components/ThreeScene'), { ssr: false });

   export default function HomePage() {
     return <ThreeScene />;
   }
   ```

3. Create your ThreeScene component  
   Under `components/ThreeScene.tsx`, a minimal setup looks like this:  
   ```tsx
   import { Canvas } from '@react-three/fiber';
   import { OrbitControls, Environment, useGLTF } from '@react-three/drei';
   import { Suspense } from 'react';

   function Model() {
     // assuming you’ve placed a GLTF at public/models/myModel.glb
     const { scene } = useGLTF('/models/myModel.glb');
     return <primitive object={scene} />;
   }

   export default function ThreeScene() {
     return (
       <Canvas
         shadows
         camera={{ position: [0, 2, 5], fov: 50 }}
         style={{ width: '100vw', height: '100vh' }}
       >
         <ambientLight intensity={0.5} />
         <directionalLight position={[5, 5, 5]} castShadow />
         <Suspense fallback={null}>
           <Model />
           <Environment files="/hdr/royal_esplanade_1k.hdr" />
         </Suspense>
         <OrbitControls />
       </Canvas>
     );
   }
   ```

4. Configure asset loading (if needed)  
   If you’re pulling in `.hdr`, `.glb`, or other file types, extend Next.js’s default loader in `next.config.js`:  
   ```js
   // next.config.js
   module.exports = {
     webpack(config) {
       config.module.rules.push({
         test: /\.(hdr|gltf|glb)$/,
         type: 'asset/resource',
       });
       return config;
     },
   };
   ```

5. Verify TS types  
   You’ve aligned `@types/three` with your three version—nice. For Drei’s hooks (like `useGLTF`), you shouldn’t need extra types, but if you see any TS errors, double-check that your `tsconfig.json` includes:  
   ```jsonc
   {
     "compilerOptions": {
       "jsx": "react-jsx",
       "esModuleInterop": true,
       "skipLibCheck": true,
       …
     }
   }
   ```

Next up:  
• Let me know if you want a deeper look at performance tweaks—like memoizing large models or baking lights.  
• We can talk about postprocessing (bloom, taa) with fünf.js or @react-three/postprocessing.  
• If you’re targeting mobile, I’ve got tips on trimming draw calls and polycounts.

