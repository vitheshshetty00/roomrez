"use client"
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db ,auth} from '../../firebase/config';// Import your Firestore instance
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from '@ashwinthomas/react-time-picker-dropdown';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import moment from 'moment';


export default function Home() {
    const [user, setUser] = useState(null);
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [capacity, setCapacity] = useState();
    const [rooms, setRooms] = useState([]);
    const [userBookings, setUserBookings] = useState([]);

    useEffect(() => {
        const fetchRooms = async () => {
          const roomCollectionRef = collection(db, 'rooms');
          const roomSnapshot = await getDocs(roomCollectionRef);
          const roomList = roomSnapshot.docs.map(doc => doc.data());
          setRooms(roomList);
        };
      
        fetchRooms();
      }, []);

    // ...
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
      
        // Cleanup subscription on unmount
        return () => unsubscribe();
      }, []);

      useEffect(() => {
        const fetchUserBookings = async () => {
          const q = query(
            collection(db, 'bookings'),
            where('userId', '==', user?.uid)
          );
          const querySnapshot = await getDocs(q);
          const bookings = querySnapshot.docs.map(doc => doc.data());
          setUserBookings(bookings);
        };
      
        if (user) {
          fetchUserBookings();
        }
      }, [user]);


      const handleBooking = async (roomId) => {
        try {
          const bookingsRef = collection(db, 'bookings');
          const bookingsSnapshot = await getDocs(bookingsRef);
          const bookings = bookingsSnapshot.docs.map(doc => doc.data());
          
          const selectedDate = moment(date).format('MMM D');
          const selectedStartTime = moment(startTime, 'hh:mm:ss a');
          const selectedEndTime = moment(endTime, 'hh:mm:ss a');
        //   console.log(selectedStartTime, selectedEndTime);
      
          const overlappingBookings = bookings.filter(booking => {
            const bookingDate = moment(booking.date.toDate()).format('MMM D');
            const bookingStartTime = moment(booking.startTime, 'hh:mm:ss a');
            const bookingEndTime = moment(booking.endTime, 'hh:mm:ss a');

            return booking.roomId === roomId &&
                bookingDate === selectedDate &&
                    (selectedStartTime.isBetween(bookingStartTime, bookingEndTime) || selectedEndTime.isBetween(bookingStartTime, bookingEndTime))
      
            });
      
          if (overlappingBookings.length > 0) {
            alert('This room is already booked at the selected date and time.');
            return;
          }
      
          await addDoc(bookingsRef, {
            roomId: roomId,
            userId: user.uid, // Assuming `user` is the current user
            date: date,
            startTime: startTime,
            endTime: endTime,
            // Add other booking details here...
          });
          
      
          alert('Room booked successfully!');
        } catch (error) {
          console.error('Error booking room:', error);
        }
      };

    return (
        <div className="bg-gray-50 text-black h-full w-full relative">
            <nav>
                <div className="flex justify-between items-center p-4 shadow-sm absolute w-full">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">RoomRez</h1>
                </div>

                <h1>{user && <p>Welcome, {user.displayName}</p>}</h1>
            </div></nav>
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                
                <div className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 mx-auto my-4 p-4 bg-white shadow rounded">
                    <label className="block">
                        <span className="text-gray-700">Date</span>
                    </label>
                        <DatePicker selected={date} onChange={(d) => setDate(d)} />
                    <label className="block">
                        <span className="text-gray-700">Start Time</span>
                        </label>
                        <TimePicker
                            defaultValue="10:10:00 am"
                            useTwelveHourFormat={true}
                            onTimeChange={setStartTime}        
                        />
                    <label className="block">
                        <span className="text-gray-700">End Time</span>
                        </label>
                        <TimePicker
                            defaultValue="10:10:00 am"
                            useTwelveHourFormat={true}
                            onTimeChange={setEndTime}        
                        />
                    <label className="block">
                        <span className="text-gray-700">Capacity</span>
                    </label>
                        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} placeholder="Capacity" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded self-end mt-4">Search Rooms</button>
                </div>
                <ul className="mt-4 flex flex-col justify-center items-center space-y-2 w-full">

                    {rooms.filter(room => room.capacity >= capacity).map((room) => (
                        <li key={room.id} className="border p-4 flex justify-between items-center rounded space-y-2 w-full md:w-1/2 lg:w-1/3">
                        <div className="flex flex-col">
                            <p className="font-bold">Room Name: <span className="font-normal">{room.name}</span></p>
                            <p className="font-bold">Capacity: <span className="font-normal">{room.capacity}</span></p>
                            
                        </div>
                        <button onClick={() => handleBooking(room.id)} className="px-4 py-2 mt-2 bg-blue-500 text-white rounded self-end">Book Room</button>
                        </li>
                    ))}
                </ul>

                <h2 className="text-2xl font-bold mt-8">Your Bookings</h2>
                    <ul className="mt-4 flex flex-col justify-center items-center space-y-2 w-full">
                        {userBookings.map((booking) => (
                        <li key={booking.id} className="border p-4 flex justify-between items-center rounded space-y-2 w-full md:w-1/2 lg:w-1/3">
                            <div className="flex flex-col">
                            <p className="font-bold">Room ID: <span className="font-normal">{booking.roomId}</span></p>
                            {/* <p className="font-bold">Room name: <span className="font-normal">{booking.roomName}</span></p> */}
                            <p className="font-bold">Date: <span className="font-normal">{moment(booking.date.toDate()).format('MMM D, YYYY')}</span></p>
                            <p className="font-bold">Start Time: <span className="font-normal">{booking.startTime}</span></p>
                            <p className="font-bold">End Time: <span className="font-normal">{booking.endTime}</span></p>
                            </div>
                        </li>
                        ))}
                    </ul>
            </div>
        </div>
    );
}