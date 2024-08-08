"use client";

import Image from "next/image";
import { Input } from "antd";
import { CoffeeOutlined } from '@ant-design/icons'; // Example food-related icon
import { useState, MouseEvent } from "react";
import { Button } from "antd";

import { functions, httpsCallable } from '../firebaseConfig'; 

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [recipe, setRecipe] = useState<string>("");
  const [error, setError] = useState<string>("")

  const backendAddress = 'https://generaterecipe-ryk2xzz7ja-uc.a.run.app'
  console.log("backendAddress: ", backendAddress);
  
  const onSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    console.log("in here");
    setRecipe("");

    try {

      // const generateRecipe = httpsCallable(functions, 'generateRecipe');
      // const response = await generateRecipe(JSON.stringify({ prompt: inputValue }));

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

      const reader = response.body
        .pipeThrough(new TextDecoderStream())
        .getReader();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        console.log('Received: ', value);
        // if value
        setRecipe((prev) => prev + value);
      }
    } catch (error) {
      console.log(error);
      setError(String(error))
      
    }

  };

  return (
    <main>
      <div style={{ ...styles.page, alignItems: 'center', backgroundColor: 'white', flexDirection: 'column', height: '100vh' }}>
        <h1>Recipe Generator</h1>
        <div>
          <Input
            size="large"
            prefix={<CoffeeOutlined />}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        <div>
          <Button size="large" type="primary" onClick={(e) => onSubmit(e)}>Submit</Button>
        </div>

        {recipe && (
          <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', marginTop:'2rem'}}>
            <h2>Generated Recipe:</h2>
            <div style={{ margin: '2rem 30rem', justifyContent:'center', }}>
              <p style={{ fontSize: '20px', lineHeight:'2.5rem'}}>{recipe}</p>
            </div>
          </div>

        )}

        {error && (
          <div>
            <p>{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
  }
}
