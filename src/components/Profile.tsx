import { Button, Form } from "react-bootstrap"
import { useForm } from "react-hook-form";
import type { UserProfile } from "../type";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";





function Profile() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [profileInfo, setProfileInfo] = useState<UserProfile | null>(null);
    const [successMsg, setSuccessMsg] = useState('');
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<UserProfile>();



  useEffect(() => {
    const getProfileInfo = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${BASE_API_URL}/profile`);
        // console.log(data);
        
        setProfileInfo(data);
      } catch (error) {
        setErrorMsg(
          'Error while getting profile information. Try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    getProfileInfo();
  }, []);



  useEffect(() => {
    reset({
       firstName:profileInfo?.firstName || "",
       lastName:profileInfo?.lastName || "",
       email:profileInfo?.email || ""

    });
  }, [profileInfo]);


  async function onSubmit(data: UserProfile) {
    console.log(data);

       setErrorMsg('');
    try {
      await axios.patch(`${BASE_API_URL}/profile`, data);
      setSuccessMsg('Profile is updated successfully.');
      setTimeout(() => {
        setSuccessMsg('');
      }, 2000);
    } catch (error) {
      setSuccessMsg('');
      setErrorMsg('Error while updating profile. Try again later.');
    }
    

  }
  return (
    <div className='main-content'>
      <h2 className='my-3 text-center'>Profile</h2>
      {isLoading && <p className='loading'>Loading...</p>}
      {errorMsg && <p className='error-msg'>{errorMsg}</p>}
      {successMsg && <p className='success-msg'>{successMsg}</p>}
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Group className='mb-3' controlId='first_name'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your first name'
            {...register('firstName', {
              required: true
            })}
          />
          {errors.firstName && (
            <p className='error-msg'>Please enter your first name</p>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='last_name'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter your last name'
            {...register('lastName', {
              required: true
            })}
          />
          {errors.lastName && (
            <p className='error-msg'>Please enter your last name</p>
          )}
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            {...register('email', {
              required: true
            })}
          />
          {errors.email && <p className='error-msg'>Please enter your email</p>}
        </Form.Group>
        <Form.Group>
          <Button type='submit' variant='success'>
            Update Profile
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default Profile