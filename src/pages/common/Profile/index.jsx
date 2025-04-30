import React, { useEffect, useState } from 'react'
import PageTitle from '../../../components/pageTitle'
import { getUserProfile, updateUserProfile } from '../../../apiCalls/users';
import { Button, Input } from 'antd';
import toast from 'react-hot-toast';
import { PROFILE, TOAST_MESSAGES } from '../../../utils/constants';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [inputType, setInputType] = useState('');


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProfile();
  }, []);  

  console.log(profile);

  const handleSave = async () => {
    try {
      const response = await updateUserProfile({[inputType]: name});
      if (response.success) {
        setIsEditing(false);
        setName('');
        setEmail('');
        setInputType('');
        setIsEditing(false);
        toast.success(response.message);
      }else{
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <div>
      <PageTitle title={PROFILE.PAGE_TITLE} />
      <div className='profile-container'>
          <h1>{PROFILE.FORM_LABELS.NAME}: {profile?.name}</h1>
          <Button onClick={() => {setIsEditing(true); setInputType('name')}}>{PROFILE.FORM_BUTTONS.EDIT_NAME}</Button>
          <p>{PROFILE.FORM_LABELS.EMAIL}: {profile?.email}</p>
          <Button onClick={() => {setIsEditing(true); setInputType('email')}}>Edit Email</Button>
      </div>
      {isEditing && (
        <div className='edit-profile-container'>
          {inputType === 'name' && (
            <Input placeholder={PROFILE.FORM_PLACEHOLDERS.NAME} onChange={(e) => setName(e.target.value)} />
          )}
          {inputType === 'email' && (
            <Input placeholder={PROFILE.FORM_PLACEHOLDERS.EMAIL} onChange={(e) => setEmail(e.target.value)} />
          )}
          <Button onClick={handleSave}>{PROFILE.FORM_BUTTONS.SAVE}</Button>
        </div>
      )}
    </div>
  )
}

export default Profile
