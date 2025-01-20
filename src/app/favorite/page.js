"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../utils/firebase";
import Link from "next/link";
import styles from "./index.module.css";
import { FaPlay } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import Loader from "@/skeletons/SimpleLoader";

export default function Favorite() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [favorites, setFavorites] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const fetchFavorites = async (userId) => {
    const favoritesCollection = collection(db, "users", userId, "favorites");
    const snapshot = await getDocs(favoritesCollection);
    const favoriteData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setFavorites(favoriteData);
    setDataLoading(false);
  };

  const removeFromFavorites = async (itemId) => {
    if (!user) return;

    try {
      const docRef = doc(db, "users", user.uid, "favorites", String(itemId));
      await deleteDoc(docRef);
      setFavorites((prev) => prev.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error("Error removing item from favorites:", error);
    }
  };

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    } else if (user) {
      fetchFavorites(user.uid);
    }
  }, [user, loading]);

  if (loading || dataLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <div className={styles.bg} style={{ backgroundImage: `url(/bg.jpg)` }} >
        <h1 className={styles.title}>Favorite</h1>
        <div className={styles.bgoverlay}></div>
      </div>
      <div className="maincontainer">
        {favorites.length ? (
          <div className={styles.grid}>
            {favorites.map((item) => (
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
                  className={styles.removeButton}
                  onClick={() => removeFromFavorites(item.id)}
                >
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.noFavorites}>No favorites yet.</p>
        )}
      </div>
    </div>
  );
}
