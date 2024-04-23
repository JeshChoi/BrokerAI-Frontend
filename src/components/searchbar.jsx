import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  const [input, setInput] = useState('');

  // Function to handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      callApi(); // Make API call with the current input value
      setInput(''); // Reset input field after search
    }
  };

  // Function to call API
  const callApi = (search = input) => {
    const url = `http://127.0.0.1:3333/crawler/new/${search}`;

    fetch(url, {
      method: "GET",
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log(data); // Handle response data
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
      });
  };

  const callScoopAPI = () => {
    const url = `http://127.0.0.1:3333/crawler/new_halls_today`;
    fetch(url, {
      method: "GET"
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log('Error fetching scoop: ', error)
    })
  }

  // Function to handle button click
  const handleButtonClick = () => {
    callApi(); // Make API call with the current input value
    setInput(''); // Reset input field after search
  };

  const handleButtonClickScoopToday = () => {
    callScoopAPI()
  }

  return (
    <div className="flex w-full h-[50px] items-center gap-2 space-x-2 py-[60px] px-[10vw]">
      <div className="flex grow items-center h-[56px] outline outline-1 outline-[#c0c3c5] px-5 bg-white rounded-2xl">
        <img src='glass.svg' alt='Search' className='w-6 h-6' />
        <input
          className='outline-none text-base border-none h-[56px] w-full px-4 py-2 rounded-2xl'
          type="text" // Changed to "text" as it's not specifically an email input
          placeholder="Search Food Hall..."
          value={input} // Controlled input
          onKeyDown={handleKeyDown}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <div onClick={handleButtonClick}>
        <Button className='h-[56px] w-[200px] gap-2 bg-black rounded-2xl' type="button"> {/* Changed type to "button" */}
          <img src='sparkle.svg' alt='crawl' /> {/* Added alt text */}
          <span className='text-base'>New Crawler</span>
        </Button>
      </div>
      <div onClick={handleButtonClickScoopToday}>
        <Button className='h-[56px] w-[200px] gap-2 bg-[#FF6B00] rounded-2xl' type="button"> {/* Changed type to "button" */}
          <img src='sparkle.svg' alt='crawl' /> {/* Added alt text */}
          <span className='text-base'>Today's Scoop</span>
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
