import {useState} from "react";
import imgany from "./anoymous avatar.png"
export default RegPic;

function RegPic ({value, setvalue, onInputChange}){
    const [imageUrl, setImageUrl] = useState('');

    /**
     * handleFileChange-check if the user enter image and save
     * @param event
     */
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        // setvalue(URL.createObjectURL(selectedFile.path);
        if (selectedFile && selectedFile.type.startsWith('image/')&& selectedFile.size <= 200000) {
            const reader = new FileReader();
            reader.onload = () => {
                const image = new Image();
                image.src = reader.result;
                image.onload = () => {
                    if (image.width > 0 && image.height > 0) {
                        setImageUrl(URL.createObjectURL(selectedFile));
                        onInputChange(true);
                        setvalue(reader.result)
                    } else {
                        onInputChange(false);
                    }
                };
            };
            reader.readAsDataURL(selectedFile);
        } else {
            onInputChange(false);
        }
    };

    return(
        <>
            <div className="input-container" id="user-picture">
                <label htmlFor="input-picture">Profile Picture</label>
                <input type="file" id="input-picture" name="input-picture" onChange={handleFileChange}/>
            </div>
            <div id="add-picture">
                {imageUrl ? (
                    <img src={imageUrl} alt="Selected Picture" />
                ) : (
                    <img src={imgany} alt="Default Picture" />
                )}
            </div>
        </>
    );
}
