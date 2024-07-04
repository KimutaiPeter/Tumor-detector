import React, { useEffect, useState,useRef } from "react";
import './css/index.css'
import './css/layout.css'

export default function Index(props) {

    const [file_list, set_file_list] = useState([])

    useEffect(() => { props.update_file_list(file_list) }, [file_list])
    const hiddenFileInput = useRef(null);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };

    function handle_file(e) {
        props.update_files(e.target.files)
        var files=[]
        for (let i = 0; i < e.target.files.length; i++) {
            //set_file_list([...file_list, e.target.files[i].name]);
            //console.log(e.target.files[i])
            files.push(e.target.files[i].name)
        }
        //console.log(files)
        set_file_list(files)
    }

    return (
        <div class="body top_center_vertical">
            <div class="files_upload_container center_center_vertical" onClick={e => { handleClick() }}>
                <img src="/imgs/upload-cloud.svg" alt="" />
                <span>Upload Files</span>
                <input style={{display:'none'}} type="file" name="file1" id="" onChange={e => { handle_file(e) }} ref={hiddenFileInput} multiple />
            </div>

            <div class="choosen_files_container top_center_vertical">
                <div class="choosen_files_sub_container">

                    {
                        file_list.map(name => {
                            return (<div class="file_container center_left_horizontal">
                                <div class="file_labels center_left_horizontal">
                                    <img src="/imgs/file-type.svg" alt="" />
                                    <span>{name}</span>
                                </div>
                                <img src="/imgs/cancel.svg" alt="" />
                            </div>)
                        })
                    }




                </div>
                <button onClick={e => { props.change_page('show') }} >Check</button>
            </div>



            <div class="about_container top_left_verical">
                <h4>About Cancer Diagnosis and Treatment</h4>
                <p>Brain cancer diagnosis traditionally involves a multi-step process. Imaging scans like MRIs and CT scans
                    create detailed pictures of the brain, which are then analyzed by radiologists. AI is making significant
                    strides in this area, allowing for faster analysis and improved accuracy in detecting tumors. If a
                    suspicious area is identified, a biopsy, where a small tissue sample is extracted, is performed to confirm
                    the presence and type of cancer. Once diagnosed, treatment options depend on the specific characteristics of
                    the tumor. Surgery, radiation therapy, chemotherapy, and targeted therapies are all on the table, and AI can
                    play a role here as well. By analyzing a patient's unique tumor data, AI can assist doctors in recommending
                    the most effective treatment course, potentially leading to more personalized care.</p>
            </div>
        </div>
    )
}