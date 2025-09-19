import React from 'react';
import { motion } from "framer-motion";
import { Phone, Mail, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Container from '@/components/Container';

// --- A MORE VIBRANT AND VISIBLE AURORA BACKGROUND ---
const AuroraBackground = () => (
    <div className="fixed inset-0 -z-10 w-full h-screen overflow-hidden">
        {/* Blurry glow effects with more opacity */}
        <div
            className="absolute top-[-20%] left-[-20%] w-[30rem] h-[30rem] bg-primary/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '12s' }}
        />
        <div
            className="absolute bottom-[-20%] right-[-20%] w-[30rem] h-[30rem] bg-secondary/70 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '14s', animationDelay: '3s' }}
        />
        <div
            className="absolute bottom-[25%] left-[15%] w-[20rem] h-[20rem] bg-accent/70 rounded-full blur-3xl animate-pulse"
            style={{ animationDuration: '16s', animationDelay: '1s' }}
        />
    </div>
);

const ContactPage = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Form submitted!");
    };

    return (
        <div className="relative w-full min-h-screen bg-background pt-44 pb-20">
            <AuroraBackground />

            <Container className="relative z-10">
                <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-12">

                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Card className="h-full bg-card/70 backdrop-blur-lg border-border/50 shadow-xl">
                            <CardHeader>
                                <h1 className="font-display text-4xl font-bold tracking-tight text-primary">
                                    Let's build something together
                                </h1>
                                <CardDescription className="pt-2 text-lg text-foreground/80">
                                    Have a project in mind or a question for us? We'd love to hear from you.
                                </CardDescription>
                            </CardHeader>
                            <form onSubmit={handleSubmit}>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2"><Label htmlFor="name">Name</Label><Input id="name" required /></div>
                                    <div className="space-y-2"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
                                    <div className="space-y-2"><Label htmlFor="message">Message</Label><Textarea id="message" required rows={5} /></div>
                                </CardContent>
                                <CardFooter>
                                    <Button type="submit" size="lg" className="w-full">Send Message</Button>
                                </CardFooter>
                            </form>
                        </Card>
                    </motion.div>

                    <motion.div
                        className="flex flex-col gap-y-8"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Card className="bg-card/70 backdrop-blur-lg border-border/50 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-display text-3xl font-bold text-primary">Direct Lines</CardTitle>
                                <CardDescription className="pt-1 text-lg text-foreground/80">For immediate inquiries.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <a href="mailto:support@versiq.com" className="flex items-center gap-4 group">
                                    <Mail className="h-7 w-7 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Email</h3>
                                        <p className="text-base text-muted-foreground transition-colors group-hover:text-primary">support@versiq.com</p>
                                    </div>
                                </a>
                                <a href="tel:+15551234567" className="flex items-center gap-4 group">
                                    <Phone className="h-7 w-7 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Phone</h3>
                                        <p className="text-base text-muted-foreground transition-colors group-hover:text-primary">+1 (555) 123-4567</p>
                                    </div>
                                </a>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/70 backdrop-blur-lg border-border/50 shadow-xl">
                            <CardHeader>
                                <CardTitle className="font-display text-3xl font-bold text-primary">Our Headquarters</CardTitle>
                                <CardDescription className="pt-1 text-lg text-foreground/80">Stop by for a visit.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4">
                                    <MapPin className="h-7 w-7 text-primary flex-shrink-0" />
                                    <div>
                                        <h3 className="text-lg font-semibold text-foreground">Location</h3>
                                        <p className="text-base text-muted-foreground">123 Fashion Ave, New York, NY</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </Container>
        </div>
    );
};

export default ContactPage;