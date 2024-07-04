import React, { useState } from "react";
import Index from "./parts";
import Show from "./parts/show";

export default function Home(){
    const [page,set_page]=useState('index')
    const [file_list,set_file_list]=useState([])
    const [files,set_files]=useState(null)

    function change_page(new_page){
        set_page(new_page)
    }

    function update_file_list(data){
        set_file_list(data)
    }

    function update_files(data){
        set_files(data)
    }

    return (
        <>
            {(()=>{
                if(page==='index'){
                    return <Index change_page={change_page} update_file_list={update_file_list} update_files={update_files}></Index>
                }else{
                    if(files){
                        return <Show change_page={change_page} files={files} />
                    }else{
                        alert('Please choose some scans')
                        set_page('index')
                    }
                    
                }

            })()}
        </>
    )
}