'use client'
import React, { useState, useEffect } from 'react';
import { collection,doc, setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../firebase/config'; // Assuming you have already set up Firebase
import { v4 as uuidv4 } from 'uuid';

const Page = () => {
    const [rooms, setRooms] = useState([]);
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [newCapacity, setNewCapacity] = useState('');
    const [newRoomName, setNewRoomName] = useState('');
    const [roomCapacity, setRoomCapacity] = useState(0);


    const handleEditClick = (roomId, capacity) => {
    setEditingRoomId(roomId);
    setNewCapacity(capacity);
    };

    const handleEditSubmit = async (e) => {
    e.preventDefault();
    await updateRoom(editingRoomId, { capacity: newCapacity });
    setEditingRoomId(null);
    };
    const handleAddRoom = async (e) => {
        e.preventDefault();
        await addRoom(newRoomName, roomCapacity);
        setNewRoomName('');
        setRoomCapacity('');
      };

    const fetchRooms = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'rooms'));
            const roomData = querySnapshot.docs.map((doc) => doc.data());
            setRooms(roomData);
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const addRoom = async (roomName, roomCapacity) => {
        try {
            const uid = uuidv4();
            const roomRef = doc(db, 'rooms', uid);
            await setDoc(roomRef, {
            id: uid,
            name: roomName, // Name of the room
            capacity: parseInt(roomCapacity), // Capacity of the room
            
            });

            console.log('Room added with ID:', roomRef.id);
            fetchRooms(); // Refresh the room list after adding a new room
        } catch (error) {
            console.error('Error adding room:', error);
        }
    };

    const updateRoom = async (roomId, updatedData) => {
        console.log(roomId)
        try {
            const roomRef = doc(db, 'rooms', roomId);
            await updateDoc(roomRef, updatedData);
            console.log('Room updated successfully');
            fetchRooms(); // Refresh the room list after updating a room
        } catch (error) {
            console.error('Error updating room:', error);
        }
    };

    const deleteRoom = async (roomId) => {
        try {
            const roomRef = doc(db, 'rooms', roomId);
            await deleteDoc(roomRef);
            console.log('Room deleted successfully');
            fetchRooms(); // Refresh the room list after deleting a room
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="bg-gray-50 text-black h-[100vh] w-full relative">
            <div className="flex justify-between items-center p-4 shadow-sm absolute w-full">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">RoomRez</h1>
                </div>

                <h1>Welcome, Admin</h1>
            </div>

            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h2 className="text-2xl font-bold mb-4">Room Management</h2>
                
                <ul className="mt-4 flex flex-col justify-center items-center space-y-2 w-full">
                    {rooms.map((room) => (
                        <li key={room.id} className="border p-4 flex justify-between items-center rounded space-y-2 w-full md:w-1/2 lg:w-1/3">
                        <div className="flex flex-col">
                            <p className="font-bold">Room Name: <span className="font-normal">{room.name}</span></p>
                            <p className="font-bold">Capacity: <span className="font-normal">{room.capacity}</span></p>
                            {/* Add other room properties here... */}
                        </div>
                        <div className="flex gap-2">
                            {editingRoomId === room.id ? (
                            <form onSubmit={handleEditSubmit}>
                                <input type="number" value={newCapacity} onChange={(e) => setNewCapacity(e.target.value)} />
                                <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">Save</button>
                            </form>
                            ) : (
                            <>
                                <button onClick={() => handleEditClick(room.id, room.capacity)} className="px-4 py-2 bg-yellow-500 text-white rounded">Edit</button>
                                <button onClick={() => deleteRoom(room.id)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                            </>
                            )}
                        </div>
                        </li>
                    ))}
                </ul>
                <form onSubmit={handleAddRoom} className="flex flex-col gap-4 w-full md:w-1/2 lg:w-1/3 mx-auto my-4 p-4 bg-white shadow rounded">
                    <h2 className="text-2xl font-bold mb-4 text-center">Add Room</h2>
                    <input type="text" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Room Name" className="px-4 py-2 border rounded" />
                    <input type="number" value={roomCapacity} onChange={(e) => setRoomCapacity(e.target.value)} placeholder="Capacity" className="px-4 py-2 border rounded" />
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded self-end">Add Room</button>
            </form>
            </div>
            
        </div>
    );
};

export default Page;
