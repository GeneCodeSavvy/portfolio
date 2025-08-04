---
title: A Perspective on SBOL and the Community
description: This summer I had the priveledge of working with the SynBioDex Community, as a Google Summer of Code contributor. I am still new to this community and it's offerings. With this blog, I want to share my journey.
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

I am being mentored by Dr. Gonzalo and Dr. Jake Beal for this project. Our work started with creating SBOL Notebooks, which will be used to test the converter. This also helped me get more familiar with the SBOL specification. Through this process, their help went beyond just fixing bugs or creating tests; they also taught me the best practices for writing Python code. Other members of the community, such as Dr. Prashant, Dr. Chris, and Dr. Tom have also been helpful in various places while working.

Their guidance also extends beyond the core project goals. Dr. Gonzalo has planned an additional challenge for me: encoding an entire E. coli&rsquo;s genome in SBOL.
This approach, which combines practical tasks with forward-looking challenges, makes working here exciting.

