// 'use client';

// export default function Loading() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background">
//       <div className="relative">
//         {/* Gradient background with rotation */}
//         <div className="absolute inset-0 animate-[spin_3s_linear_infinite]">
//           <div className="h-full w-full rounded-full bg-gradient-to-r from-primary to-primary/0 blur-xl" />
//         </div>
        
//         {/* Loading spinner */}
//         <div className="relative flex h-24 w-24 animate-[spin_2s_linear_infinite]">
//           <div className="absolute h-full w-full rounded-full border-4 border-t-primary border-l-primary border-r-primary/10 border-b-primary/10" />
//           <div className="absolute h-full w-full rounded-full border-4 border-r-primary border-t-primary/10 border-l-primary/10 border-b-primary/10 animate-[spin_1s_linear_infinite]" />
//         </div>

//         {/* Inner pulse */}
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="h-12 w-12 rounded-full bg-primary/20 animate-[pulse_2s_ease-in-out_infinite]" />
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="relative h-[80px] w-[80px]">
        {/* Minimal loading spinner */}
        <div className="absolute inset-0 rounded-full border-[4px] border-primary/10 " />
        <div 
          className=" absolute inset-0 rounded-full border-[4px] border-transparent border-t-primary"
          style={{
            animation: 'spin 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite'
          }}
        />
      </div>
    </div>
  );
}