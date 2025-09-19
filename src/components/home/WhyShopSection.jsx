import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Sparkles, UserCheck, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Container from '@/components/Container';

const whyShopItems = [
    { icon: <ShieldCheck className="h-8 w-8 text-primary" />, title: 'Guaranteed Authenticity', description: 'Every piece is sourced directly from the world’s most trusted brands and designers.' },
    { icon: <Sparkles className="h-8 w-8 text-primary" />, title: 'Expertly Curated', description: 'Our collection is hand-picked to bring you timeless style that transcends seasonal trends.' },
    { icon: <UserCheck className="h-8 w-8 text-primary" />, title: 'Personalized Service', description: 'From styling advice to order support, our dedicated team is here to assist you.' },
    { icon: <PackageCheck className="h-8 w-8 text-primary" />, title: 'Seamless Delivery', description: 'Enjoy complimentary, tracked shipping on every order, packaged with the utmost care.' }
];

const FeaturePoint = ({ icon, title, description, side = 'left' }) => (
    <motion.div
        className={`flex items-start gap-4 text-left ${side === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''
            }`}
        initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
    >
        <div className="flex-shrink-0 pt-1">{icon}</div>
        <div>
            <h3 className="font-sans text-xl font-bold text-foreground">{title}</h3>
            <p className="mt-1 text-muted-foreground">{description}</p>
        </div>
    </motion.div>
);

const WhyShopSection = () => {
    return (
        <section className="py-12 sm:py-16 overflow-hidden bg-card">
            <Container>
                <motion.div
                    className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="font-display text-4xl sm:text-5xl font-bold text-primary">
                        The Versiq Standard
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Quality and curation are at the heart of everything we do.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 lg:gap-x-8 items-center">

                    <div className="flex flex-col justify-between h-full space-y-12 lg:space-y-0">
                        <div><FeaturePoint {...whyShopItems[0]} side="left" /></div>
                        <div className="lg:-translate-y-52">
                            <FeaturePoint {...whyShopItems[1]} side="left" />
                        </div>
                    </div>

                    <div className="text-center row-start-1 md:col-span-2 lg:col-span-1 lg:row-auto">
                        <motion.img
                            src="/images/why-shop-image.jpeg"
                            alt="Invest in Yourself - Versiq brand ethos"
                            className="w-full max-w-[350px] mx-auto rounded-lg shadow-2xl"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.5 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                        >
                            <Button asChild size="lg" className="mt-10">
                                <Link to="/collections">Shop The Curation</Link>
                            </Button>
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-between h-full space-y-12 lg:space-y-0">
                        <div className="lg:translate-y-28">
                            <FeaturePoint {...whyShopItems[2]} side="left" />
                        </div>
                        <div className="lg:-translate-y-24">
                            <FeaturePoint {...whyShopItems[3]} side="left" />
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    );
};

export default WhyShopSection;