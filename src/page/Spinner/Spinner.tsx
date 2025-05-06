// import React from "react";

// const EcommerceSpinner: React.FC = () => {
//   return (
//     <>
//       <div className="ecommerce-spinner">
//         <div className="spinner-circle"></div>
//         <div className="spinner-icon"><img src="/public/ecommerce-svgrepo-com.svg" style={{width: "30px"}}></img> </div>
//       </div>

//       <style>{`
//         .ecommerce-spinner {
//           position: fixed;
//           inset: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           background: rgba(255, 255, 255, 0.6);
//           z-index: 9999;
//         }

//         .spinner-circle {
//           width: 80px;
//           height: 80px;
//           border: 4px dashed #FEAF00;
//           border-radius: 50%;
//           animation: spin 2s linear infinite;
//           position: absolute;
//         }

//         .spinner-icon {
//           font-size: 32px;
//           color: #3b82f6;
//           z-index: 1;
//            display: flex;
//           align-items: center;
//           justify-content: center;

//         }

//         @keyframes spin {
//           100% {
//             transform: rotate(360deg);
//           }
//         }
//       `}</style>
//     </>
//   );
// };

// export default EcommerceSpinner;
import React, { useEffect } from "react";
// import { motion } from "framer-motion";
import Lottie from "lottie-react";
import loading from "../../../public/Animation - 1746524049657.json";
const EcommerceSpinner: React.FC = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className="ecommerce-spinner">
        <Lottie animationData={loading} ></Lottie>
        {/* <div className="spinner-circle"></div>

        <motion.div
          className="spinner-icon"
          initial={{ scale: 0.8, opacity: 0.5 }}
          animate={{ scale: [0.8, 1, 0.95, 1], opacity: 1 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <img
            src="/ecommerce-svgrepo-com.svg"
            alt="Loading"
            style={{ width: "50px" }}
          />
        </motion.div> */}
      </div>

      <style>{`
        .ecommerce-spinner {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.6);
          z-index: 9999;
        }

        .spinner-circle {
          width: 120px;
          height: 120px;
          border: 5px dashed #FEAF00;
          border-radius: 50%;
          animation: spin 2s linear infinite;
          position: absolute;
        }

        .spinner-icon {
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @keyframes spin {
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default EcommerceSpinner;
