// "use client";

// import { Input, Button } from "antd";
// import { CoffeeOutlined } from '@ant-design/icons';
// import { useState, MouseEvent } from "react";

// import { functions, httpsCallable } from '../firebaseConfig';

// export default function Home() {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [recipe, setRecipe] = useState<string>("");
//   const [error, setError] = useState<string>("");

//   const backendAddress = 'https://generaterecipe-ryk2xzz7ja-uc.a.run.app';

//   const onSubmit = async (event: MouseEvent) => {
//     event.preventDefault();
//     setRecipe("");

//     try {
//       const response = await fetch(
//         backendAddress,
//         {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json'
//           },
//           body: JSON.stringify({ prompt: inputValue }),
//         }
//       );

//       const reader = response.body?.pipeThrough(new TextDecoderStream()).getReader();

//       while (true) {
//         if (reader) {
//           const { value, done } = await reader.read();

//           console.log("value: ", value);

//           if (done) break;

//           // Modify the text stream
//           const formattedValue = value
//             .replace(/###/g, '<br><br>')              // Replace ### with <br>
//             .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Replace **text** with <b>text</b>

//           setRecipe((prev) => prev + formattedValue);
//         } else {
//           setRecipe((prev) => prev + "reader has become null ");
//         }
//       }
//     } catch (error) {
//       console.log(error);
//       setError(String(error));
//     }
//   };


//   const upperColor = "linear-gradient(90deg, rgba(38,102,218,1) 5%, rgba(95,169,219,1) 90%)";

//   return (
//     <main style={styles.main}>
//       <div style={{ ...styles.upperSection, background: upperColor }}>

//         <div style={{ display: 'flex', justifyContent: 'center', }}>
//           <h1 style={styles.title}>Recipe Generator</h1>

//         </div>
//       </div>

//       <div style={styles.bottomSection}>
//         <div style={styles.contentBox}>
//           <>
//             {recipe && (
//               <div style={styles.recipeContainer}>
                
//                 <p style={styles.recipeText} dangerouslySetInnerHTML={{ __html: recipe }}></p>
//               </div>
//             )}
//             {error && (
//               <div>
//                 <p>{error}</p>
//               </div>
//             )}
//           </>
//         </div>
//       </div>

//       <div style={styles.inputContainer}>
//         <Input
//           size="large"
//           prefix={<CoffeeOutlined />}
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           style={styles.input}
//         />
//         <Button size="large" type="primary" onClick={(e) => onSubmit(e)} style={styles.button}>Submit</Button>
//       </div>
//     </main>
//   );
// }

// const styles = {
//   main: {
//     height: '100vh',
//     display: 'flex',
//     flexDirection: 'column',
//     margin: 0,
//     justifyContent: "center",
//     backgroundColor: 'white',
//   },
//   upperSection: {
//     height: '50%',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flex: 0.6
//   },
//   title: {
//     fontSize: 40,
//     color: 'white',
//   },
//   bottomSection: {
//     flex: 0.4,
//     backgroundColor: 'white',
//     height: '50%',
//     width: '100%',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     flexDirection: 'column'
//   },
//   contentBox: {
//     width: '100%',
//     maxWidth: 1100,
//     minWidth: 0,
//     backgroundColor: "white",
//     minHeight: 600,
//     maxHeight: 800,
//     zIndex: 3,
//     position: 'relative',
//     top: '-5rem',
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
//     borderRadius: 10,
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'flex-start',
    
//     overflow: "scroll",
//     padding: '20px',
//   },
//   recipeContainer: {
//     marginTop: '2rem',
//     textAlign: 'center',
//     display: "flex",
//     justifyContent: "flex-start"
//   },
//   recipeText: {
//     fontSize: '20px',
//     lineHeight: '2.5rem',
//     maxWidth: '80%',
//     margin: '0 auto',
//     textAlign:'left',
//   },
//   inputContainer: {
//     alignSelf: 'center',
//     display: "flex",
//     flexDirection: 'column',
//     justifyContent: 'center',
//     backgroundColor: 'white',
//     alignItems: 'center',
//     paddingBottom: '5rem'
//   },
//   input: {
//     marginBottom: 20,
//     flex: 7 / 8
//   },
//   button: {
//     width: '50%',
//     flex: 1 / 8,
//     borderRadius: 30
//   }
// };


"use client";

import { Input, Button } from "antd";
import { CoffeeOutlined } from '@ant-design/icons';
import { useState, MouseEvent } from "react";

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const [error, setError] = useState<string>("");

  const backendAddress = 'https://generaterecipe-ryk2xzz7ja-uc.a.run.app';

  const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    setRecipe("");

    try {
      const response = await fetch(
        backendAddress,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt: inputValue }),
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader?.read() || {};

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        console.log("chunk: ", chunk);

        // Modify the text stream
        const formattedValue = chunk
          .replace(/###/g, '<br><br>')              // Replace ### with <br><br>
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Replace **text** with <strong>text</strong>

        setRecipe((prev) => prev + formattedValue);
      }
    } catch (error) {
      console.log(error);
      setError(String(error));
    }
  };


  const upperColor = "linear-gradient(90deg, rgba(38,102,218,1) 5%, rgba(95,169,219,1) 90%)";

  return (
    <main style={styles.main}>
      <div style={{ ...styles.upperSection, background: upperColor }}>

        <div style={{ display: 'flex', justifyContent: 'center', }}>
          <h1 style={styles.title}>Recipe Generator</h1>

        </div>
      </div>

      <div style={styles.bottomSection}>
        <div style={styles.contentBox}>
          <>
            {recipe && (
              <div style={styles.recipeContainer}>

                <p style={styles.recipeText} dangerouslySetInnerHTML={{ __html: recipe }}></p>
              </div>
            )}
            {error && (
              <div>
                <p>{error}</p>
              </div>
            )}
          </>
        </div>
      </div>

      <div style={styles.inputContainer}>
        <Input
          size="large"
          prefix={<CoffeeOutlined />}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
        />
        <Button size="large" type="primary" onClick={(e) => onSubmit(e)} style={styles.button}>Submit</Button>
      </div>
    </main>
  );
}

const styles = {
  main: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    margin: 0,
    justifyContent: "center",
    backgroundColor: 'white',
  },
  upperSection: {
    height: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.6
  },
  title: {
    fontSize: 40,
    color: 'white',
  },
  bottomSection: {
    flex: 0.4,
    backgroundColor: 'white',
    height: '50%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  contentBox: {
    width: '100%',
    maxWidth: 1100,
    minWidth: 0,
    backgroundColor: "white",
    minHeight: 600,
    maxHeight: 800,
    zIndex: 3,
    position: 'relative',
    top: '-5rem',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',

    overflow: "scroll",
    padding: '20px',
  },
  recipeContainer: {
    marginTop: '2rem',
    textAlign: 'center',
    display: "flex",
    justifyContent: "flex-start"
  },
  recipeText: {
    fontSize: '20px',
    lineHeight: '2.5rem',
    maxWidth: '80%',
    margin: '0 auto',
    textAlign: 'left',
  },
  inputContainer: {
    alignSelf: 'center',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: '5rem'
  },
  input: {
    marginBottom: 20,
    flex: 7 / 8
  },
  button: {
    width: '50%',
    flex: 1 / 8,
    borderRadius: 30
  }
};
