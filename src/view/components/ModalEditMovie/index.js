import { useSelector } from 'react-redux'
import { useFormik } from "formik";
import { useEffect } from 'react';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';

import './style.scss'
import { movieSelector } from '../../../redux/selector'
import ShowToast from '../../../utils/ShowToast'
import { movieActions } from '../../../redux/slice/movieSlice'

function ModalEditMovie({ title, hiddenForm, movieSelect, typeModal }) {
    const movieList = useSelector(movieSelector)
    const dispatch = useDispatch()

    let titleModal = ''
    if (typeModal === 'create') {
        titleModal = 'Add'
    }
    if (typeModal === 'update') {
        titleModal = 'Update'
    }
    if (typeModal === 'remove') {
        titleModal = 'Remove'
    }

    const formData = useFormik({
        initialValues: {
            id: "",
            title: "",
            date: "",
            description: "",
            image: "",
        },
        validationSchema: Yup.object({
            title: Yup.string().required("The title cannot be left blank!"),
            date: Yup.string().required("The Premiere date cannot be left blank!"),
            image: Yup.string().required("The image cannot be left blank!"),
        }),
        onSubmit: (values) => {
            if (typeModal === 'create') {
                dispatch(movieActions.addMovie({ values, ShowToast }))
            }
            if (typeModal === 'update') {
                dispatch(movieActions.updateMovie({ values, ShowToast }))
            }
            if (typeModal === 'remove') {
                dispatch(movieActions.removeMovie({ id: values.id, ShowToast }))
            }
            hiddenForm()
        },
    })

    useEffect(() => {
        if (movieSelect !== null) {
            const data = movieList.filter(item => item.id === movieSelect)
            formData.setValues({
                ...data[0]
            });
        }
    }, [movieSelect])

    return (
        <div className='mem'>
            <div className='mem_overlay' onClick={hiddenForm}></div>
            <form onSubmit={formData.handleSubmit}>
                <div className='mem_container'>
                    <h1 className='mem_header'>{title}</h1>
                    <div className='mem_body'>
                        <div className='form-group'>
                            <label>Title:</label>
                            <input placeholder='Enter title...'
                                id='title'
                                name='title'
                                value={formData.values.title}
                                onChange={formData.handleChange}
                                onBlur={formData.handleBlur}
                                readOnly={(typeModal === 'get' || typeModal === 'remove') ? true : false}
                            />
                            <p>{(formData.touched.title && formData.errors.title) && formData.errors.title}</p>
                        </div>
                        <div className='form-group'>
                            <label>Premiere date:</label>
                            <input type='date' placeholder='Premiere date...'
                                id='date'
                                name='date'
                                value={formData.values.date}
                                onChange={formData.handleChange}
                                onBlur={formData.handleBlur}
                                readOnly={(typeModal === 'get' || typeModal === 'remove') ? true : false}
                            />
                            <p>{(formData.touched.date && formData.errors.date) && formData.errors.date}</p>
                        </div>
                        <div className='form-group'>
                            <label>Image:</label>
                            <input
                                placeholder='Enter image...'
                                id='image'
                                name='image'
                                value={formData.values.image}
                                onChange={formData.handleChange}
                                onBlur={formData.handleBlur}
                                readOnly={(typeModal === 'get' || typeModal === 'remove') ? true : false}
                            />
                            <p>{(formData.touched.image && formData.errors.image) && formData.errors.image}</p>
                        </div>

                        <div className='form-group'>
                            <label>Description:</label>
                            <textarea placeholder='Enter description'
                                id='description'
                                name='description'
                                value={formData.values.description}
                                onChange={formData.handleChange}
                                readOnly={(typeModal === 'get' || typeModal === 'remove') ? true : false}
                            ></textarea>
                        </div>
                    </div>
                    <div className='mem_footer'>
                        <div>
                            {
                                typeModal !== 'get' &&
                                <button type='submit'>{titleModal}</button>
                            }
                            <button onClick={hiddenForm}>Exit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div >
    );
}

export default ModalEditMovie;
