---
title: A Perspective on SBOL and the Community
description: This summer I had the privilege of working with the SynBioDex Community, as a Google Summer of Code contributor. I am still new to this community and it's offerings. With this blog, I want to share my journey.
date: 2025-07-31
---

### What is Synthetic Biology?

Growing up, I was puzzled by a simple question: How can the same fundamental building blocks create both a lifeless rock and a living person?

My perspective changed, after reading the paper, &ldquo;[There’s Plenty of Room Right Here: Biological Systems as Evolved, Overloaded, Multi-Scale Machines](https://www.mdpi.com/2313-7673/8/1/110)&rdquo; by Dr. Joshua Bonguard and Dr. Michael Levin. It discussed about how organisms should be understood as &ldquo;systems&rdquo;. Suddenly, living and non-living aren&rsquo;t two different categories. Instead, they exist on a continuum of systems that are progressively more &ldquo;aware&rdquo;.

side note :  &ldquo;systems&rdquo; here are not just &ldquo;machines&rdquo; in the classical sense, but are deeply complex, multi-functional entities. The paper also states that every system is a computer in a given context. I would love to go into details about the paper someday.

Once you see living organisms as systems, you realize they can be de-structured and re-structured. We can engineer them to create new systems from old ones.
That, for me, is the core of Synthetic Biology.



### My GSoC Project

I have talked about the &ldquo;Synthetic Biology Open Language&rdquo; at length in my previous posts. SBOL serves as a vital community standard for representing biological designs, with version 3.1 offering mature capabilities for the entire Design-Build-Test-Learn cycle.

Despite this advancement, a significant hurdle persists: the widespread use of the older SBOL2 format by crucial tools and large repositories like SynBioHub, coupled with the absence of a complete converter to bridge the gap with SBOL3. This incompatibility fragments the ecosystem, hinders the adoption of the latest standard, and limits seamless data exchange.

This project tackles this challenge by directly contributing to the development of the essential bidirectional Python converter between SBOL2 and SBOL3 within the sbol-utilities library. By implementing and testing conversion functionalities, this work aims to create the necessary infrastructure to unify the SBOL software landscape, enable smooth migration to SBOL3, facilitate interoperability, and unlock the full potential of the standard for the synthetic biology community.


### Mentors and Community

I’m being mentored by Dr. Gonzalo and Dr. Jake Beal for this project and their expertise is insane! But what really stands out is their patience.

From day one, it’s been super hands-on. We started with SBOL Notebooks, which will not only help test the converter but also made me comfortable with SBOL itself. But their guidance wasn’t just the one task. They helped me set up proper tests, proper tutorials and kept reminding me to write clean, readable, maintainable Python code. Stuff that actually matters long term.

After completing the convertor, Dr. Gonzalo has already planned the next exciting step - encoding the entire E. coli genome in SBOL. It’s ambitious, exciting, and also kind of unreal that I get to be part of something like that. But more than anything, it shows how invested they are in pushing my growth.

It’s rare to find mentorship that’s this practical. I’ve learned so much already and I’m just getting started.

