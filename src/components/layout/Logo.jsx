import React from 'react';
import { HashLink } from 'react-router-hash-link';
import { motion } from 'framer-motion';

export const Logo = () => (
    <motion.div>
        <HashLink
            to="/"
            className="font-logo text-3xl md:text-4xl font-extrabold tracking-tight relative text-primary"
        >
            Versiq
        </HashLink>
    </motion.div>
);