import axios from "axios";
import React, { useState, useEffect } from "react";
import { Navigation } from "../../components/Navigation";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil-state/auth";
import { useParams } from "react-router-dom";

// TODO add formik in task frontend-5
export const CreatePermission = () => {
    let {id} = useParams();
    console.log(id)
    return (null);
}