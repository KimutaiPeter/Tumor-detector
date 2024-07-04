import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/show.css'

export default function Show(props) {
    const [responce, set_responce] = useState([])

    useEffect(() => {
        handle_upload()
    }, [])



    function handle_upload() {
        const data = new FormData();
        for (let i = 0; i < props.files.length; i++) {
            data.append("files[]", props.files[i]);
        }

        axios.post("http://localhost:5000/upload2", data)
            .then((response) => {
                //console.log(response)
                set_responce(response['data']['data'])
            })
            .catch((error) => {
                console.error(error);
                if (error.response) {
                    console.log(error.response)
                    if (error.response.status === 401) {
                        alert("Invalid credentials");
                    }
                }
            });

    };


    return (
        <div class="body center_center_vertical">

            <div class="top_left_verical">
                <button class="continue_button" onClick={e => { props.change_page('index') }} >Continue</button>
                <div class="choosen_files_container top_left_verical">



                    {
                        responce.map((file) => {
                            return (
                                <div class="file_container center_left_horizontal">
                                    <div class="file_labels center_left_horizontal">
                                        <img src="/imgs/file-type.svg" alt="" />
                                        <span>{file['name']}</span>
                                    </div>{(()=>{
                                        if(file['code']==='0'){
                                            return (
                                                <>
                                                
                                                <img src="/imgs/check.svg" alt="" />
                                                <span>Tumor not detected</span>
                                                </>
                                            )
                                        }else{
                                            return (
                                                <>
                                                <img src="/imgs/tick.svg" alt="" />
                                                <span>Tumor detected- {file['desc']} </span>
                                                </>
                                            )
                                        }
                                    })()}
                                    
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </div>
    )
}