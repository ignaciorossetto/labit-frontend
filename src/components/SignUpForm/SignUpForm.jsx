import { faPencil, faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./signUpForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useForm } from "react-hook-form"
import { useEffect, useReducer, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { SignUpFormClickReducer } from "../../hooks/SignUpFormReducerHook";


const formatDate = (date) => {
    const birth_date_formatted = date.split('-')[2]+ '-' + date.split('-')[1] + '-' +date.split('-')[0]
    return birth_date_formatted
}

const INITIAL_STATE = {
    obraSocial: true,
    prepaga: false,
    sinCobertura: false,
    name: 'Obra Social'
}


const SignUpForm = () => {
    const [state, dispatch] = useReducer(SignUpFormClickReducer, INITIAL_STATE)
    const navigate = useNavigate()
    const {register, handleSubmit, watch,  formState: { errors }, reset } = useForm()

    const [vars, setVars] = useState({
        affilate_number: '',
        afillate_number_error: {
            state:false,
            message: ''
        },
        medical_coverages_id: null,
        insurance_name: '',
        insurance_name_error: {
            state:false,
            message: ''
        },
        confirmed_insurance: false,
        loading_form: false,
        loading_insurance: false,
        response_error: {
            email: {
                status: false,
                message: ''
            }
        }
    })
    const [medicalCovList, setMedicalCovList] = useState([])
        
    const handleFormSubmit = async(data) => {
        if (!handleConfirmInsClick()) {
            return
        }
        setVars((prev)=>  ({
            ...prev, loading_form: true}))
        const { confirmEmail, confirmPswd, newsCheckbox, termsCheckbox, state, postal_code,  birth_date, ...other} = data
        
        const obj = {
                ...other, 
                birth_date: formatDate(birth_date), 
                postal_code: parseInt(postal_code),
                role_id: 6, 
                user_active: true,
                medical_coverages_id: vars.medical_coverages_id
            }
        try {
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/users`, obj)
            setVars((prev)=>  ({
                ...prev, loading_form: false}))
            reset(data)
            Swal.fire({
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 2500,
                icon: 'success',
                title: 'Creaste un usuario exitosamente!'
            })   
            navigate('/login')
            
        } catch (error) {
            if (error.response.data.payload.message === 'Email already exists') {
                setVars((prev)=>  ({
                    ...prev,
                    response_error: {
                        email: {
                            status: true,
                            message: 'Email registrado. Proba con uno nuevo!'
                        }
                    }
                }))  
            }
            setVars((prev)=>  ({
                ...prev, loading_form: false}))  
                
            Swal.fire({
                toast: true,
                position: 'top-end',
                timerProgressBar: true,
                showConfirmButton: false,
                timer: 2500,
                icon: 'error',
                title: 'Hubo un error, intenta más tarde!'
            })          
        }
    }
    const handleInsClick = (e) => {
        if (state.sinCobertura) {
            setVars((prev)=> ({...prev, medical_coverages_id: 13}))    
        }
        setVars((prev)=>  (
            {
                ...prev, 
                affilate_number: '', 
                insurance_name: '', 
                insurance_name_error: {state: false, message: ''}, 
                afillate_number_error: {state: false, message: ''}, 
                
            }))
        dispatch({type: e.target.id, payload: e.target.innerText})
    }

    const handleSelectIns = (e) => {
        setVars((prev)=>  ({
            ...prev, 
            affilate_number: '',
            insurance_name_error: {state: false}, 
            insurance_name: e.target.innerText,
            medical_coverages_id: parseInt(e.target.id), 
        }))
    }

    const handleConfirmInsClick = () => {
        if (state.sinCobertura) {
            return true
        }
        if (!vars.insurance_name) {
            setVars((prev)=> ({...prev, insurance_name_error: {
                state: true,
                message: `Debes Seleccionar una ${state.name}`
            }}))
            return false
        }
        if (vars.affilate_number.length <= 0) {
            setVars((prev)=> ({...prev, afillate_number_error: {
                state: true,
                message: 'El campo no puede estar vacío'
            }}))
            return false
        }
        if (vars.affilate_number.length <= 5) {
            setVars((prev)=> ({...prev, afillate_number_error: {
                state: true,
                message: 'El campo debe contener 5 o mas caracteres'
            }}))
            return false
        }
        setVars((prev)=>  ({...prev, confirmed_insurance: true}))
        return true
    }

    const handleInsNrChange = (e) => {
        setVars((prev)=>  ({...prev, affilate_number: e.target.value}))

    }

    const handleEditInsClick = () => {
        setVars((prev)=>  ({...prev, confirmed_insurance: false}))
    }


    const checkEmail = () => {
        const email = watch("email");
        const confirmEmail = watch("confirmEmail");
        return email === confirmEmail;
      };
      const checkPswd = () => {
        const password = watch("password");
        const confirmPswd = watch("confirmPswd");
        return password === confirmPswd;
      };

    useEffect(()=> {
         const fetchIns = async() => {
            setVars((prev)=>  ({...prev, loading_insurance: true}))
            try {
                const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/medicalcoverages/`)
                setMedicalCovList(data.payload)
                setVars((prev)=>  ({...prev, loading_insurance: false}))
            } catch (error) {
                setVars((prev)=>  ({...prev, loading_insurance: false}))
            }
         }
         fetchIns()
    }, [])
    
  return (
    <div className="signUpFormContainer">
        {
            !vars.loading_form ? 
        <>
      <h1 className="signUpForm_title">Formulario de registro</h1>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="signUpForm">
        <div className="sinUpFormGrid">
          <div className="signUpFormInputContainer">
            <label htmlFor="">Nombre(s)</label>
            <input type="text" {...register('first_name', {
                required:true,
                minLength: 3,
                
            })} />
            {errors?.first_name?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.first_name?.type === 'minLength' && <span className="signUpFormInput_error">Este campo debe contener al menos 3 caracteres</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Apellido(s)</label>
            <input type="text" {...register('last_name', {
                required:true,
                minLength: 3,
            })}/>
            {errors?.last_name?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.last_name?.type === 'minLength' && <span className="signUpFormInput_error">Este campo debe contener al menos 3 caracteres</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Género</label>
            <select  {...register('gender_id', {
                required:true
            })}>
                <option hidden value={''}>-</option>
                <option value={5} >Masculino</option>
                <option value={7} >Femenino</option>
                <option value={8} >No binario</option>
                <option value={9} >Otros</option>
            </select>
            {errors?.gender_id?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Fecha de nacimiento</label>
            <input type="date"
            min="1997-01-01" max="2030-12-31"
             {...register('birth_date', {
                required: true,
            })}/>
            {errors?.birth_date?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Tipo de identificación</label>
            <select  {...register('dni_type_id', {
                required:true
            })}>
                <option hidden value={''}>-</option>
                <option value={1}>DNI</option>
                <option value={2}>PASAPORTE</option>
            </select>
            {errors?.dni_type_id?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Nº de identificación <span>(sin puntos ni guiones)</span></label>
            <input type="number" {...register('dni', {
                required: true,
            })}/>
            {errors?.dni?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Teléfono</label>
            <input type="text" {...register('phone_number', {
                required: true,
            })}/>
            {errors?.phone_number?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Domicilio</label>
            <input type="text" {...register('address', {
                required: true,
            })}/>
            {errors?.address?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
          <div className="signUpFormInputContainer">
            <label htmlFor="">Provincia</label>
            <select  {...register('state', {
                required:true
            })}>
                <option hidden value={''}>-</option>
                <option value="1">BUENOS AIRES</option>
                <option value="2">CORDOBA</option>
                <option value="3">SANTA FE</option>
            </select>
            {errors?.state?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
          </div>
            <div className="signUpFormInputContainer">
                <label htmlFor="">Código postal</label>
                <input type="number" {...register('postal_code', {
                    required: true,
                })}/>
                {errors?.postal_code?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}

            </div>
        </div>


        { !vars.confirmed_insurance &&
            <>
            
            
        <div className="signUpFormMedInsOptsContainer">
          <div onClick={handleInsClick} id={1} value={1} className={`signUpFormMedInsOpts ${state?.obraSocial && 'signUpFormMedInsOpts_active'} `}>Obra Social</div>
          <div className="signUpFormMedInsOpts_divider "></div>
          <div onClick={handleInsClick} id={2} value={2} className={`signUpFormMedInsOpts ${state?.prepaga && 'signUpFormMedInsOpts_active'} `}>Médicina Prepaga</div>
          <div className="signUpFormMedInsOpts_divider"></div>
          <div onClick={handleInsClick} id={3} value={3} className={`signUpFormMedInsOpts ${state?.sinCobertura && 'signUpFormMedInsOpts_active'} `}>Sin cobertura</div>
        </div>
        { !state?.sinCobertura &&
              <>
              
            <div className={`singUpFormSelectCont`} >
                { vars.loading_insurance && 
                    <FontAwesomeIcon 
                        icon={faSpinner} 
                        spin 
                        size="2xl" 
                        color="white"
                        style={{textAlign: 'center', width: '100%', marginTop: '30px'}}
                        />}

                {
                    !vars.loading_insurance && 
                <>
                <div className="singUpFormSelectCont_">
                <h3>Indique su {state?.name}</h3>
                <div className="singUpFormSelectOptsCont">
                    {
                        medicalCovList?.map((e)=>{ 
                            if(e.medical_coverage_type_id === 1 && state?.obraSocial){
                                return <span key={e.medical_coverages_id} id={`${e.medical_coverages_id}`} onClick={handleSelectIns}>{e.medical_coverage_name}</span>               
                            }
                            if(e.medical_coverage_type_id === 2 && state?.prepaga){
                                return <span key={e.medical_coverages_id} id={`${e.medical_coverages_id}`} onClick={handleSelectIns}>{e.medical_coverage_name}</span>    
                            }
                            }
                        )
                    }
                </div>
                </div>
                
                <div className="singUpFormSelecConfCont">
                    <h3>{state?.name} seleccionada:</h3>
                    <p>{vars.insurance_name}</p>
                    {vars.insurance_name_error.state && <span className="signUpFormInput_error">{vars.insurance_name_error.message}</span>}
                            <h3>N° de afiliado</h3>
                        <input type="text" value={vars.affilate_number} {...register('affiliate_number', {
                            required: true,
                            onChange: handleInsNrChange,
                            })}/>
                        {vars.afillate_number_error.state && <span className="signUpFormInput_error">{vars.afillate_number_error.message}</span>}
                        {errors?.affiliate_number?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
                        <div onClick={handleConfirmInsClick}>Confirmar</div>
                </div>
                </>

                }
            </div>  
            </>  
            }   
            </>
            }
            {
                vars.confirmed_insurance &&
                <>
                <h3 className="signUpSelectedInsCont_title">{state.name}</h3>
            <div className="signUpSelectedInsCont_">
            <div className="signUpSelectedInsCont">
                <div className="signUpSelectedInsCont_ins">
                    {vars.insurance_name}
                </div>
                <div className="signUpSelectedInsCont_nr">
                    {vars.affilate_number}
                </div>
            </div>
            <FontAwesomeIcon onClick={handleEditInsClick} className="signUpSelectedInsCont_modify" icon={faPencil} size='xl'/>
            </div>
                </>
            }

        <div className="signUpFormInputPassContainer">
        <div className="signUpFormInputContainer_pass">
            <label htmlFor="">E-mail</label>
            <input type="text" {...register('email', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}/>
            {vars.response_error.email.status && <span className="signUpFormInput_error">{vars.response_error.email.message}</span>}
            {errors?.email?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.email?.type === 'pattern' && <span className="signUpFormInput_error">Error en el formato del email</span>}
        </div>
        <div className="signUpFormInputContainer_pass">
            <label htmlFor="">Confirmar E-mail</label>
            <input type="text" {...register('confirmEmail', {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  validate: checkEmail,
            })}/>
            {errors?.confirmEmail?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.confirmEmail?.type === 'pattern' && <span className="signUpFormInput_error">Error en el formato del email</span>}
            {errors.confirmEmail?.type === "validate" && <span className="signUpFormInput_error">Los correos deben coincidir</span>}
        </div>
        </div>
        <div className="signUpFormInputPassContainer">
        <div className="signUpFormInputContainer_pass">
            <label htmlFor="">Contraseña</label>
            <input type="password" {...register('password', {
                required: true,
                pattern: '',
                minLength: 8
                }
            )}/>
            {errors?.password?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.password?.type === 'pattern' && <span className="signUpFormInput_error">Error en el formato del email</span>}
            {errors.password?.type === "minLength" && <span className="signUpFormInput_error">La contraseña debe contener al menos 8 carácteres.</span>}
        </div>
        <div className="signUpFormInputContainer_pass">
            <label htmlFor="">Confirmar contraseña</label>
            <input type="password" {...register('confirmPswd', {
                validate: checkPswd,
                required: true,
                pattern: `^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).*$`,
                minLength: 8,
                }
            )}/>
            {errors?.confirmPswd?.type === 'required' && <span className="signUpFormInput_error">Este campo es obligatorio</span>}
            {errors?.confirmPswd?.type === 'pattern' && <span className="signUpFormInput_error">Error en el formato del email</span>}
            {errors.confirmPswd?.type === "validate" && <span className="signUpFormInput_error">Las contraseñas deben coincidir</span>}
            {errors.confirmPswd?.type === "minLength" && <span className="signUpFormInput_error">La contraseña debe contener al menos 8 carácteres.</span>}
        </div>
        </div>
        <span className="signUpFormPassRules">* Las contraseñas deben contar con una minuscula, una mayuscula, un número y un caracter especial</span>
        <div className="signUpFormInputContainer_checkbox">
        <input type="checkbox" {...register('termsCheckbox', {
        required: true})}/>
        <label htmlFor="">Acepto términos y declaro haber leído el reglamento del laboratorio</label>
        </div>
        {errors?.termsCheckbox?.type === 'required' && <span className="signUpFormInput_error termsCheckbox">Este campo es obligatorio</span>}
        <div className="signUpFormInputContainer_checkbox">
        <input type="checkbox" {...register('newsCheckbox')}/>
        <label htmlFor="">Desea recibir en su mail notificaciones sobre su cuenta</label>
        </div>
        <button className="signUpFormInputContainer_submit">Registrarse</button>
      </form>
      </>
      :
      <div className="signUpForm_loading">
        <h1>Registrando...</h1>
        <FontAwesomeIcon icon={faSpinner} spin size="2xl"/>
      </div>
      }
    </div>
  );
};

export default SignUpForm;
