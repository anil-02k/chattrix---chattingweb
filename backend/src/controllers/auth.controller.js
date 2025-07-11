import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js"
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    // res.send('Signup endpoint');
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: 'Please provide all required fields: email, password, and fullName' });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters long' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            return res.status(400).send('Invalid email format');
        }

        const exestingUser = await User.findOne({ email });

        if (exestingUser) {
            return res.status(400).json({ message: 'Email already in use, please us a different one' });
        }

        const idx = Math.floor(Math.random() * 100) + 1;

        const randomAvtar = `https://avatar.iran.liara.run/public/${idx}.png`

        const newUser = await User.create({
            email,
            password,
            fullName,
            profilePic: randomAvtar
        })
        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePic || "",
            })

            console.log("Stream user upserted successfully:", newUser._id.toString());
        }
        catch (error) {
            console.error("Error creating user:", error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }


        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        })

        res.status(201).json({
            success: true,
            user: newUser,
            message: 'User created successfully',
        })

    }
    catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

}

export async function signin(req, res) {
    // res.send('Signin endpoint');
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide both email and password' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.matchPassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "7d" })

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        })
        res.status(200).json({
            success: true,
            user,
            message: 'User signed in successfully',
        });
    }
    catch (error) {
        console.error("Error during signin:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export function logout(req, res) {
    res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    });
    res.status(200).json({ message: 'User logged out successfully' });
}


export async function onboard(req, res) {
     try {
    const userId = req.user._id;

    const { fullName, bio, nativeLanguage, learningLanguage, location } = req.body;

    if (!fullName || !bio || !nativeLanguage || !learningLanguage || !location) {
      return res.status(400).json({
        message: "All fields are required",
        missingFields: [
          !fullName && "fullName",
          !bio && "bio",
          !nativeLanguage && "nativeLanguage",
          !learningLanguage && "learningLanguage",
          !location && "location",
        ].filter(Boolean),
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        ...req.body,
        isOnboarded: true,
      },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    try {
      await upsertStreamUser({
        id: updatedUser._id.toString(),
        name: updatedUser.fullName,
        image: updatedUser.profilePic || "",
      });
      console.log(`Stream user updated after onboarding for ${updatedUser.fullName}`);
    } catch (streamError) {
      console.log("Error updating Stream user during onboarding:", streamError.message);
    }

    res.status(200).json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Onboarding error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}