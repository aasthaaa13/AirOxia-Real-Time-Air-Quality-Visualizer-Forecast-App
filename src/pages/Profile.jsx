import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
  Camera, Mail, Phone, ShieldCheck
} from 'lucide-react';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';

const Profile = () => {
  const [user, setUser] = useState({
    name: 'Ananya Sharma',
    email: 'ananya.sharma@example.com',
    phone: '+91 98765 43210',
    avatar:
      'https://storage.googleapis.com/hostinger-horizons-assets-prod/646d655f-9721-4f93-9e45-48d684074f32/woman-with-a-flower-in-her-hair.png',
    twoFactor: false,
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    toast({
      title: '✅ Profile Updated',
      description: 'Your profile info has been saved successfully.',
    });
  };

  const toggle2FA = (enabled) => {
    setUser((prev) => ({ ...prev, twoFactor: enabled }));
    toast({
      title: `2FA ${enabled ? 'Enabled' : 'Disabled'}`,
      description: 'Your account security preferences were updated.',
    });
  };

  const handleAvatarChange = () => {
    toast({
      title: 'Coming Soon 🚧',
      description: 'Avatar editing will be available in future updates.',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'tween', duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <Helmet>
        <title>Profile – AirWatch India</title>
        <meta name="description" content="Manage your profile, avatar, and security settings." />
      </Helmet>

      <header>
        <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
        <p className="text-muted-foreground">Manage your personal and security details.</p>
      </header>

      {/* Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Info</CardTitle>
          <CardDescription>Update your name, email, and phone number.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={user.avatar} alt="Avatar" />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="icon"
                className="absolute -bottom-1 -right-1 rounded-full w-8 h-8"
                onClick={handleAvatarChange}
              >
                <Camera className="w-4 h-4" />
                <span className="sr-only">Edit Avatar</span>
              </Button>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="email" type="email" defaultValue={user.email} className="pl-10" />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input id="phone" type="tel" defaultValue={user.phone} className="pl-10" />
              </div>
            </div>
            <div className="md:col-span-2 flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
          <CardDescription>Secure your account with two-factor authentication.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between bg-secondary p-4 rounded-lg">
            <div className="flex items-center gap-4">
              <ShieldCheck className="text-primary w-6 h-6" />
              <div>
                <h4 className="font-semibold text-foreground">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Extra security for your account.</p>
              </div>
            </div>
            <Switch checked={user.twoFactor} onCheckedChange={toggle2FA} />
          </div>

          <div className="bg-yellow-500/10 border-l-4 border-yellow-500 text-yellow-800 p-4 text-sm rounded-r">
            <strong>Note:</strong> 2FA is for demo only. You'll need an authenticator app once it's live.
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default Profile;
