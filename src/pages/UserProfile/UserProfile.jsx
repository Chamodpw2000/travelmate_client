import React, { useState, useEffect } from 'react';
import { FaEdit, FaSave, FaTimes, FaSpinner } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [edited, setEdited] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [tempUser, setTempUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    
    // Get email from localStorage or context
    const localUser = JSON.parse(localStorage.getItem('user')) || null;
    const email = localUser?.email || null; // Added optional chaining

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                console.log("User Profile Page Loaded");
                const res = await axios.get('https://travelmate-backend-zuqb.onrender.com/user/get-user-from-email', {
                    params: { email }
                });
                console.log("=========================++++++++++++++++++++++++++++++++++");
                
                console.log(res.data);
                setUser(res.data.user);
                setTempUser(res.data.user);
                setError(null);
            } catch (error) {
                console.error("Error fetching user:", error);
                setError("Failed to load user data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        
        if (email) {
            fetchUser();
        } else {
            setError("No user email found. Please log in again.");
            setLoading(false);
        }
    }, [email, edited]);

    // Generate avatar based on user's name
    const getAvatarUrl = () => {
        if (profileImage) return profileImage;
        if (user?.profilePic) return user.profilePic;
        
        // Generate random avatar using user's name or a default if user is null
        if (user) {
            const name = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User';
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=dde8ee&color=white&size=200`;
        }
        
        return `https://ui-avatars.com/api/?name=User&background=random&color=fff&size=200`;
    };

    const handleEditToggle = () => {
        if (editMode) {
            // Cancel edit - revert changes
            setTempUser({...user});
            setProfileImage(null); // Reset profile image on cancel
        } else {
            // Enter edit mode - copy current user data to temp
            setTempUser({...user});
        }
        setEditMode(!editMode);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTempUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleProfilePicChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            
            reader.readAsDataURL(file);
        }
    };

    const uploadImagesToCloudinary = async (imageData) => {
        console.log("Uploading images to Cloudinary...");
        
        try {
            // For base64 data URLs from FileReader
            if (typeof imageData === 'string' && imageData.startsWith('data:')) {
                // Convert base64 to blob
                const response = await fetch(imageData);
                const blob = await response.blob();
                
                const formData = new FormData();
                formData.append("file", blob);
                formData.append("upload_preset", "preset-for-file-upload");
                formData.append("cloud_name", "dqbkxghlh");

                const cloudinaryResponse = await axios.post(
                    "https://api.cloudinary.com/v1_1/dqbkxghlh/image/upload",
                    formData
                );

                if (cloudinaryResponse.status === 200) {
                    return cloudinaryResponse.data.secure_url;
                }
            }
            return null;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw new Error("Image upload failed");
        }
    };

    const handleSaveChanges = async () => {
        try {
            setIsSaving(true);
            
            let updatedProfilePic = tempUser.profilePic;
            
            // Upload profile image if changed
            if (profileImage) {
                updatedProfilePic = await uploadImagesToCloudinary(profileImage);
            }
            
            // Update user data via API
            const updatedUser = {
                ...tempUser,
                profilePic: updatedProfilePic
            };

            console.log("Updated User Data:", updatedUser);
            
            await axios.put('https://travelmate-backend-zuqb.onrender.com/user/update-user', updatedUser);
            
            setUser(updatedUser);
            setEditMode(false);
            setProfileImage(null);
            setEdited(!edited); // Toggle to trigger useEffect and refresh data
            
            console.log("User data updated successfully:", updatedUser);
        } catch (error) {
            console.error("Error updating user:", error);
            alert("Failed to update user data. Please try again.");
        } finally {
            setIsSaving(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0]; // Format as YYYY-MM-DD
        } catch (error) {
            console.error("Error formatting date:", error);
            return '';
        }
    };

    // Show loading state
    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading user profile...</p>
            </div>
        );
    }

    // Show error state
    if (error) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
                <button 
                    className="btn btn-primary mt-3" 
                    onClick={() => setEdited(!edited)}
                >
                    Retry
                </button>
            </div>
        );
    }

    // Show empty state if no user data
    if (!user) {
        return (
            <div className="container py-5 text-center">
                <div className="alert alert-warning" role="alert">
                    No user data available.
                </div>
            </div>
        );
    }

    return (
        <div className="container py-5 mt-24">
            <div className="row">
                <div className="col-lg-4">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body text-center">
                            <div className="position-relative d-inline-block mb-3">
                                <img 
                                    src={getAvatarUrl()} 
                                    alt="avatar"
                                    className="rounded-circle img-fluid" 
                                    style={{ width: '150px', height: '150px', objectFit: 'cover', border: '1px solid #ddd' }} 
                                />
                                {editMode && (
                                    <div className="position-absolute bottom-0 end-0">
                                        <div htmlFor="profilePicInput" className="bg-black w-8  items-center justify-center flex aspect-square rounded-full">
                                            <FaEdit className='text-white' />
                                        </div>
                                        <input 
                                            id="profilePicInput"
                                            type="file" 
                                            accept="image/*"
                                            className="d-none"
                                            onChange={handleProfilePicChange}
                                        />
                                    </div>
                                )}
                            </div>
                            <h5 className="my-3">{`${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User'}</h5>
                            <p className="text-muted mb-1">{user.email || 'No email available'}</p>
                            <p className="text-muted mb-4">
                                {user.state && user.country ? `${user.state}, ${user.country}` : 
                                 user.state ? user.state : 
                                 user.country ? user.country : 'Location not specified'}
                            </p>
                            
                            <div className="flex justify-content-center mb-2">
                                {!editMode ? (
                                    <button 
                                        className="btn btn-danger" 
                                        onClick={handleEditToggle}
                                    >
                                        <div className='flex gap-x-2'>
                                               <FaEdit className="me-2" /> Edit Profile
                                        </div>
                                     
                                    </button>
                                ) : (
                                    <>
                                        <button 
                                            className="btn btn-success me-2" 
                                            onClick={handleSaveChanges}
                                            disabled={isSaving}
                                        >
                                            {isSaving ? (
                                                <>
                                                    <FaSpinner className="me-2 fa-spin" /> Saving...
                                                </>
                                            ) : (
                                                <>
                                                <div className='flex items-center '>
   <FaSave className="me-2" /> Save
                                                </div>
                                                 
                                                </>
                                            )}
                                        </button>
                                        <button 
                                            className="btn btn-secondary" 
                                            onClick={handleEditToggle}
                                            disabled={isSaving}
                                        >
                                            <div className='flex items-center'>
                                                <FaTimes className="me-2" /> Cancel  
                                            </div>
                                          
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="col-lg-8">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">First Name</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            value={tempUser?.firstName || ''}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">{user.firstName || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">Last Name</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            value={tempUser?.lastName || ''}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">{user.lastName || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">Email</p>
                                </div>
                                <div className="col-sm-9">
                                    <p className="text-muted mb-0">{user.email || 'No email available'}</p>
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">Gender</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <select
                                            className="form-select"
                                            name="gender"
                                            value={tempUser?.gender || ''}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    ) : (
                                        <p className="text-muted mb-0">
                                            {user.gender ? 
                                             user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : 
                                             'Not specified'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">Birthday</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <input
                                            type="date"
                                            className="form-control"
                                            name="birthday"
                                            value={formatDate(tempUser?.birthday)}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">
                                            {user.birthday ? 
                                             new Date(user.birthday).toLocaleDateString() : 
                                             'Not specified'}
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">Country</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="country"
                                            value={tempUser?.country || ''}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">{user.country || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                            
                            <hr />
                            
                            <div className="row mb-3">
                                <div className="col-sm-3">
                                    <p className="mb-0 fw-bold">State/Province</p>
                                </div>
                                <div className="col-sm-9">
                                    {editMode ? (
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="state"
                                            value={tempUser?.state || ''}
                                            onChange={handleInputChange}
                                            disabled={isSaving}
                                        />
                                    ) : (
                                        <p className="text-muted mb-0">{user.state || 'Not specified'}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;