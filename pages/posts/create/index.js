import { useState } from "react";

import Router from "next/router";

import Layout from "../../../components/layout";

import axios from "axios";

function PostCreate() {

    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [validation, setValidation] = useState({});

    const handleFileChange = (e) => {

        const imageData = e.target.files[0]

        if(!imageData.type.match('image.*')) {
            setImage('');
            return
        }

        setImage(imageData);

    }

    const storePost = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);

        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`, formData)
        .then(() => {
            Router.push('/posts')
        })
        .catch((error) => {
            setValidation(error.response.data);
        })
    };

    return (
        <Layout>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card-body">
                            <form onSubmit={storePost}>

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" className="form-control" onChange={handleFileChange}/>
                                </div>
                                {
                                    validation.image && (
                                        <div className="alert alert-danger">
                                            {validation.image}
                                        </div>
                                    )
                                }

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold">TITLE</label>
                                    <input className="form-control" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan Title"/>
                                </div>
                                {
                                    validation.title &&
                                        <div className="alert alert-danger">
                                            {validation.title}
                                        </div>
                                }

                                <div className="form-group mb-3">
                                    <label className="form-label fw-bold">CONTENT</label>
                                    <textarea className="form-control" rows={3} value={content} onChange={(e) => setContent(e.target.value)} placeholder="Masukkan Content" />
                                </div>
                                {
                                    validation.content &&
                                        <div className="alert alert-danger">
                                            {validation.content}
                                        </div>
                                }

                                <button className="btn btn-primary border-0 shadow-sm" type="submit">
                                    SIMPAN
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default PostCreate