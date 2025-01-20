"use client";

import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { useAuth } from "../context/AuthContext";

export default function ContinueWatchingButton({ mediaType, id, title, season = null, episode = null }) {
  const { user } = useAuth();

  const saveToHistory = async () => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid, "history", id);

    await setDoc(docRef, {
      mediaType,
      id,
      title,
      season,
      episode,
      lastWatched: new Date().toISOString(),
    });
  };

  useEffect(() => {
    saveToHistory(); // Automatically save when component renders
  }, []);

  return null; // No UI, this is triggered in the background
}
