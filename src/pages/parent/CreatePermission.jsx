import { useParams } from "react-router-dom";

// TODO add formik in task frontend-5
export const CreatePermission = () => {
    let {id} = useParams();
    console.log(id)
    return (null);
}