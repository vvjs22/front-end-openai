import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {

    const [firstNameInput, setFirstName] = useState('');
    const [lastNameInput, setLastName] = useState('');
    const [response, setResponse] = useState({});
    
    async function onSubmit(e) {
      e.preventDefault();
      try {
        const data = await response.json();
        if(response.status !==200) {
          throw data.error || new Error('Something went wrong ${response.status}');
        }
        console.log(firstNameInput);
        setResponse(data.result);
        setFirstName('');
        setLastName('');
  
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstNameInput,
          lastName: lastNameInput,
        }),
      });
    }
  
    return (
      <>
      <div className={styles.body}>
          <title>My App</title>
          <link rel="icon" href="/favicon.ico" />
  
        <main className={styles.main}>
          <img src='/favicon.ico' className={styles.icon} />
          <h3> My App </h3>
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="What is your first name?"
              value={firstNameInput}
              onChange={(e) => {setFirstName(e.target.value)
              console.log(firstNameInput)  // This is where I want to log the value of firstName
              }}
              placeholder="Enter your first name"
            /> 
            <input
              type= "submit"
              value="generate"
            />
          </form>
          <div className={styles.result}>{response}</div>
        </main>
      </div>
      </>
    )
  }