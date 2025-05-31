"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/utils/firebase";
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import styles from "./index.module.css";
import { notFound } from "next/navigation";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const [sliderLimit, setSliderLimit] = useState(5);
    const { user } = useAuth();
    const [servers, setServers] = useState([]);
    const [newUrl, setNewUrl] = useState("");
    const router = useRouter();

    const isAdmin = user?.email === "ankitkaushik6269@gmail.com";

    useEffect(() => {
        if (user && !isAdmin) {
            router.replace("/not-found"); // or a custom error route
        }
        if (isAdmin) {
            fetchServers();
        }
    }, [user]);

    const fetchServers = async () => {
        const snapshot = await getDocs(collection(db, "servers"));
        const docs = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setServers(docs.sort((a, b) => a.index - b.index));
    };

    const updateSliderLimit = async () => {
        const ref = doc(db, "settings", "slider");
        await setDoc(ref, { limit: Number(sliderLimit) });
        toast.success("Slider limit updated!");
    };


    const onDragEnd = async (result) => {
        if (!result.destination) return;
        const items = Array.from(servers);
        const [moved] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, moved);
        setServers(items);

        await Promise.all(
            items.map((server, i) =>
                updateDoc(doc(db, "servers", server.id), { index: i })
            )
        );
        toast.success("Order updated!");
    };

    const handleDelete = async (id) => {
        await deleteDoc(doc(db, "servers", id));
        fetchServers();
    };

    const handleAdd = async () => {
        if (!newUrl.trim()) return;
        await addDoc(collection(db, "servers"), {
            url: newUrl.trim(),
            index: servers.length,
        });
        setNewUrl("");
        fetchServers();
    };

    return (
        <div className={styles.container}>
            <div className={styles.bg} style={{ backgroundImage: `url(/bg.jpg)` }} >
                <h1 className={styles.title}>Admin Panel</h1>
                <div className={styles.bgoverlay}></div>
            </div>
            <div className="maincontainer">
                <div className={styles.innercontaier}>
                    <div className={styles.servercontainer}>
                        <h2>Manage Video Player Servers</h2>
                        <div className={styles.inputdiv}>
                            <input
                                type="text"
                                placeholder="Enter server URL"
                                value={newUrl}
                                onChange={(e) => setNewUrl(e.target.value)}
                                className={styles.input}
                            />
                            <button onClick={handleAdd}>Add Server</button>
                        </div>
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="servers">
                                {(provided) => (
                                    <ul {...provided.droppableProps} ref={provided.innerRef} className={styles.items}>
                                        {servers.map((server, index) => (
                                            <Draggable key={server.id} draggableId={server.id} index={index}>
                                                {(provided) => (
                                                    <li
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={styles.item}
                                                    >
                                                        <span>
                                                            <strong>Server {index + 1}:</strong> {server.url}
                                                            <span style={{ color: "#999", marginLeft: "10px", fontSize: "12px" }}>
                                                                (drag to reorder)
                                                            </span>
                                                        </span>
                                                        <button onClick={() => handleDelete(server.id)} className={styles.deletebtn}>
                                                            Delete
                                                        </button>
                                                    </li>
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </ul>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </div>
                </div>
            </div>
        </div>
    );
}
