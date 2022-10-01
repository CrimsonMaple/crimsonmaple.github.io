---
layout: post
title: EasyCTF NoSource + NoSource Jr Writeup
description: EasyCTF Spring 2018 Web Challenge
date: 2018-02-25 11:53:35 -0400
author: admin
image: '/images/Fiddler-Post.png' # TODO: add images for these blog posts.
image_caption: 'Photo by [CrimsonMaple](https://crimson.ninja/)'
tags: [programming, web development, CTF, challenge]
featured:
---
Hey! This is Crimson! I kinda had an interesting idea. I just did a CTF for practice called "EasyCTF". Which was my first ever. One of the things i'm rather good at is snooping around website source code. I got into the habit of doing it to bypass things on my local newspaper.
NO I DON'T WANT TO PAY FOR A SUBSCRIPTION! I JUST NEED YOU FOR SCHOOL!
Well one of the problems was called "NoSource" and was listed as a 250 point question. I wanted to take that one down. But first there was a smaller one.. "NoSource Jr". So I took that one on first.

The first thing I did when I looked at the website presented to me. Was well... Inspect Element. YOU CAN'T STOP ME! Gotta love when the first thing you are greeted to is:

    <!-- Stop looking at the source code --> 

Take a look inside... and you find a variable named flag.

    Fg4GCRoHCQ4TFh0IBxENAE4qEgwHMBsfDiwJRQImHV8GQAwBDEYvV11BCA== 

Great! So now we just throw that in the solution! Nope. Notice how the flag is base 64 encoded. Great. That's always fun. So I decode it using btoa(flag);
tThat doesn't work at all. That's not even text anymore. Something is happening to it. Obviously. It's a little block of code called process. Which essentually xors the key and the flag! Cool so we just need to find the flag and pump this through the function. I looked at the source and found the key. "nosource". Well, lord brilliance decided, "I can bruteforce this!". I couldn't. I spent a few hours writing a bruteforcer and failed. It wouldn't have worked. So instead I popped the key and flag through the function process. What would you guess?! It gives text and something that at least resembles a key!

    xaufoujk}yngrcne EacrBxz`Cz*wT~:h/�ny4L23.{ 

Okay, maybe it doesn't. But we are closer!
With the help of a friend I figured this bit out. Ever remember sitting in Physics. Learning how to use one formula to calculate force from mass and the force of gravity? Know how it is kind of a triangle? It's the same thing with this. Only we are dealing with our: Output, Flag and Key. So we know the flag. It's a garbled mess of base64. We don't know the key. But we do know some of the result... There is one thing constant in every single key. The string: easyctf{. So if we put the result in for the key. We should get the ACTUAL key! Guess what happened?! We got it.

    soupysouvwnqdek{+KaudD}dkMz 

I plugged in "soupy" for key and got our final result flag!

    easyctf{congrats!_but_now_f0r_n0s0urc3_...} 

That wasn't so bad! Onto the next one! The biggest issue for the next one, was not being able to use Firefox. That dissappointed me... I had to pull out Chrome. But looking through. YOU CAN'T USE INSPECT ELEMENT. Well, you can. But if you interact with anything, you are going to get souped. Quite literally...
So. moving past that... I looked through the source. Couldn't find a flag. Hmm. Must be in that login page. But you can't pull the source from it that quickly. Or so I thought. Looking through the linked StackExchange page. I saw someone say you can use a web debugger to look and pull source. Specifically Fiddler. So I downloaded Fiddler. What would you guess? I pulled the login page. Easy as pie. Thanks StackExchange! You really are the savior to all developers! Looking through the source. I quickly found the flag!

    DQ4cJgsbCVofB18sNw4wRlhfCwAbXxpTC1wwKVlcGBIaUDAGJzowYDoqTiI= 

Guess what else? The SAME function was used! This means we can use our code for nosource jr on nosource! Awesome!
So I dialed in the Flag and "easyctf{" as the key! This gave me the real key! Same as last time!

    easyctf{wh0s_a_g00d_s0urc3_v13w3r?_YOU_ARE!} 

Checkmate.

[Challenge Source Code](https://gist.github.com/CrimsonMaple/1c04691eb9a296eb56fcad17a615177c)


Hey if you enjoyed this, please message me on Twitter! Tell me to keep this up! I really like this kinda stuff and will continue to do things like this!
