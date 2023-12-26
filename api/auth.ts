import axios from 'axios';

const API_BASE_URL = 'http://192.168.68.138:8000/api/';

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  city: string;
}

export interface BookingData {
  hotelName: string;
  roomName: string;
  price: any;
  checkInDate: string;
  checkOutDate: string;
  userId: number;
  roomId: number;
}

export const registerPost = async (data: RegisterFormData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register/$`, data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const bookingPost = async (data: BookingData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/booking/${data.userId}/${data.roomId}`,
      data,
    );
    return response.data;
  } catch (error: any) {
    console.log(error.response.data);
  }
};

export const fetchData = async () => {
  const response = await fetch('http://192.168.68.138:8000/api/location/');
  const data = await response.json();
  return data;
};

export const fetchProperty = async () => {
  const response = await fetch(`http://192.168.68.138:8000/api/property/`);
  const data = await response.json();
  return data;
};

export const fetchRoom = async () => {
  const response = await fetch('http://192.168.68.138:8000/api/room/');
  const data = await response.json();
  return data;
};

export const fetchBookingData = async () => {
  const response = await fetch('http://192.168.68.138:8000/api/booking/');
  const data = await response.json();
  return data;
};
