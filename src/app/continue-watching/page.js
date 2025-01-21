"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Link from "next/link";
import { FaPlay } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./index.module.css";
import { useRouter } from "next/navigation";
import Loader from "@/skeletons/SimpleLoader";

export default function ContinueWatchingPage() {
  const { user, loading } = useAuth();
  const [watching, setWatching] = useState([]);
  const [dataLoading, setDataLoading] = useState(true); // Handles Firebase data loading state
  const router = useRouter();

  const fetchWatching = async () => {
    setDataLoading(true);
    try {
      if (!user) return;

      const historyCollection = collection(db, "users", user.uid, "history");
      const snapshot = await getDocs(historyCollection);
      const historyData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setWatching(historyData);
    } catch (error) {
      console.error("Error fetching continue watching data:", error);
    } finally {
      setDataLoading(false);
    }
  };

  const removeFromContinueWatching = async (itemId) => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid, "history", String(itemId)); // Ensure itemId is a string
      await deleteDoc(docRef);
      setWatching((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from continue watching:", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // Redirect to the home page if the user is not logged in
    } else if (user) {
      fetchWatching();
    }
  }, [user, loading]);

  if (loading || dataLoading) return <Loader />;

  return (
    <div className={styles.container}>

      <div className={styles.bg} style={{ backgroundImage: `url(/bg.jpg)` }} >
        <h1>Continue Watching</h1>
        <div className={styles.bgoverlay}></div>
      </div>
      <div className="maincontainer">
        {watching.length > 0 ? (
          <div className={styles.grid}>
            {watching.map((item) => (
              <div key={item.id} className={styles.card}>
                <Link href={`/${item.mediaType}/${item.id}`}>
                  <div
                    className={styles.poster}
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w500${item.posterPath})`,
                    }}
                  >
                    <div className={styles.hover}>
                      <div className={styles.innerhover}>
                        <FaPlay />
                      </div>
                    </div>
                  </div>
                </Link>
                <button
                  onClick={() => removeFromContinueWatching(item.id)}
                  className={styles.removeButton}
                >
                  <AiOutlineClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="none">You have no items in Continue Watching.</p>
        )}
      </div>
    </div>
  );
}
