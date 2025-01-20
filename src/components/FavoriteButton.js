"use client";

import { useState } from "react";
import { doc, setDoc, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

export default function FavoriteButton({ mediaType, id, title }) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the item is already a favorite
  const checkFavoriteStatus = async () => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "favorites", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setIsFavorite(true);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      alert("You need to log in to add favorites.");
      return;
    }

    const docRef = doc(db, "users", user.uid, "favorites", id);

    if (isFavorite) {
      // Remove from favorites
      await deleteDoc(docRef);
      setIsFavorite(false);
    } else {
      // Add to favorites
      await setDoc(docRef, {
        mediaType,
        id,
        title,
        addedAt: new Date().toISOString(),
      });
      setIsFavorite(true);
    }
  };

  useState(() => {
    checkFavoriteStatus();
  }, [user]);

  return (
    <button onClick={toggleFavorite}>
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </button>
  );
}
