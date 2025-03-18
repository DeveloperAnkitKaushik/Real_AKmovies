"use client";

import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./Header.module.css";
import toast from 'react-hot-toast';

export default function Header() {
  const { user, logout, loading, login } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const getUserImage = () => {
    return user?.photoURL ? user.photoURL : "/default-user.png"; // Fallback to a default image
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Change header style when scrolling past 50px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}
    >
      {/* Logo */}
      <div className={`maincontainer ${styles.fix}`}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logoo}><img src="/logo.png" alt="" /></Link>
        </div>

        {/* User Section */}
        <div className={styles.userSection}>
          {loading ? (
            <p>Loading...</p>
          ) : user ? (
            <div
              className={styles.userContainer}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={getUserImage() || "/altProfilePic.jpg"}
                alt="User Avatar"
                className={styles.userImage}
              />
              <span className={styles.userName}>
                {user.displayName || "Guest"}
              </span>
            </div>
          ) : (
            // Display Login Button when the user is not logged in
            <button className={styles.loginButton} onClick={login}>
              Login
            </button>
          )}

          {/* Dropdown Menu */}
          {dropdownOpen && user && (
            <div className={styles.dropdown}>
              <Link
                href="/continue-watching"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Continue Watching
              </Link>
              <Link
                href="/favorite"
                className={styles.dropdownItem}
                onClick={() => setDropdownOpen(false)}
              >
                Favorites
              </Link>
              <button
                onClick={() => {
                  logout();
                  setDropdownOpen(false);
                  toast.success('Logged Out!')
                }}
                className={styles.dropdownItem}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
