'use client';
import React from 'react';
import { Button } from "@/components/ui/button";

const DownloadButton = () => {
    const handleButtonClick = () => {
        const url = process.env.BACKEND_API_URL + '/download_csv';
        console.log("url", url)
        fetch(url, { method: "GET" })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => {
            // Create a URL for the blob object
            const url = window.URL.createObjectURL(blob);
            // Create a temporary <a> element to trigger download
            const a = document.createElement('a');
            a.href = url;
            a.download = "foodhalls.csv"; // Set the filename
            document.body.appendChild(a); // Append <a> to body
            a.click(); // Trigger download
            a.remove(); // Remove <a> after download
            window.URL.revokeObjectURL(url); // Clean up the URL object
        })
        .catch(error => {
            console.log('Error fetching file: ', error);
        });
    };

    return (
        <div onClick={handleButtonClick}>
            <Button className='h-[56px] w-[200px] gap-2 bg-black rounded-2xl'>
                <span className='text-base'>Download CSV</span>
            </Button>
        </div>
    );
}

export default DownloadButton;
