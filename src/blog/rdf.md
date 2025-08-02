---
title: Getting Started with RDF 
subtitle: Concepts, and Real-World Examples
description: Ever wondered how information on the web becomes interconnected in a machine-readable way? Enter the Resource Description Framework (RDF) a powerful, graph-based model that structures knowledge using simple yet expressive triples, Subject – Predicate - Object. Whether you're exploring how global identifiers like IRIs work, understanding blank nodes, or diving into real-world RDF/XML examples, this guide breaks it all down in clear, digestible terms. Curious how “Harsh is learning RDF” becomes part of a web of linked data?
date: 2025-06-27T17:46:01+0530
---


## Understanding RDF: The Graph-Oriented Data Model

The Resource Description Framework (RDF) is a **graph-oriented data model** utilized to express information. RDF structures data as a collection of **triples**, each one indicating a statement: **Subject -- Predicate -> Object**. These triples create a directed and labeled graph where the **Subject** is the entity being discussed (a node), the **Predicate** is the property or relation (an edge), and the **Object** is the value or another entity (a node). For example, in the triple `"Harsh" -- "isLearning" -> "RDF"`, "Harsh" is the **subject**, "isLearning" is the **predicate**, and "RDF" is the **object**. These triples collectively comprise an **RDF statement**. RDF graphs can depict intricate and linked data by connecting multiple triples. Visit [Example](https://www.w3.org/TR/rdf-primer/example-graph.jpg) to see a visual representation.


## RDF Resources: IRIs, Literals & Blank Nodes

In RDF, entities being described are referred to as **resources** — this includes **Subjects**, **Objects**, and even **Predicates**. Resources may represent anything, such as people, documents, physical items, or abstract ideas. They can be identified using global identifiers (most commonly, IRIs), literals, and Blank Nodes (though Predicates cannot be Blank Nodes). A resource represented by an **IRI** is known as its **referent**, while a resource expressed by a **literal** is termed its **literal value**.

### The Global Identifiers

A **Uniform Resource Identifier (URI)** is a globally distinctive string applied to identify a resource, which can be utilized as a **name**, **address**, or both. URIs establish the basis of RDF by assigning each idea a consistent identity. For example, `http://example.org/person/harsh` specifies a person named Harsh. A **Uniform Resource Locator (URL)** is a specific kind of URI that also indicates **how and where to retrieve** a resource, including a scheme (e.g., `http`, `ftp`) and a network location. For instance, `https://example.com/files/data.csv` refers to a file reachable via HTTP. A **Uniform Resource Name (URN)** is a URI type used for **persistent naming** of a resource without showing its location, so it lacks access specifics. An example is `urn:isbn:9780143127796`, which denotes a book via its ISBN. An **International Resource Identifier (IRI)** is an expanded form of URI that allows a broader array of Unicode characters, permitting non-ASCII symbols and enabling support for international use. IRIs are valuable for naming web resources in non-English languages, such as `https://пример.рф/страница` (Russian).

In conclusion, all **URLs** are **URIs**, but not all **URIs** are **URLs**. Similarly, all **URNs** are **URIs**, but not all **URIs** are **URNs**. Finally, all **URIs** are valid **IRIs**, but not all **IRIs** are valid **URIs**.

### Literals

Literals are fundamental values that are not IRIs. Instances of literals include strings like "La Joconde", dates like "the 4th of July, 1990", and numbers like "3.14159". Literals are connected with a datatype that allows such values to be interpreted and parsed correctly. String literals may optionally carry a language tag. For instance, "Léonard de Vinci" might be linked with the "fr" language tag and "李奥纳多·达·文西" with the "zh" language tag. Literals may only occur in the object role within a triple.

### Blank Nodes

These are used when referring to resources without assigning a global identifier. Blank nodes may occur in the **subject and object role** of a triple. They are suitable for representing resources without explicitly naming them with an IRI.


## Named Graphs & Multi-Graph Structures in RDF

RDF offers a method to organize RDF statements into multiple graphs and assign an IRI to such graphs. The IRI that labels the graph is called the **graph name**. The graph name, which is the IRI labeling the group, may represent anything — for example, the "Source" or "Author" of the RDF content. The person reading the data is expected to understand the meaning through their community’s practices.


## Key RDF Vocabularies: RDFS, OWL, FOAF & SKOS Overview

RDF Vocabularies are sets of **predicates** (also called **properties**) and **classes** that provide shared meaning for RDF content. They specify a unified collection of terms to describe resources in a uniform and interoperable manner. Vocabularies help data from various sources be connected and interpreted through a mutual understanding of terms. Examples of widely-used RDF vocabularies include **RDFS (RDF Schema)**, which offers basic elements for ontology description; **OWL (Web Ontology Language)**, which adds more expressive features; **FOAF (Friend of a Friend)**, designed to describe individuals and their relationships; and **SKOS (Simple Knowledge Organization System)**, created for modeling knowledge systems. Custom vocabularies may also be defined using IRIs, allowing communities to build terms specific to their field. Reusing well-known vocabularies enhances RDF data's interoperability and facilitates its integration with external datasets.


## RDF in Action: XML Example of Triples & Descriptions

In RDF/XML, RDF triples are specified within an XML element `rdf:RDF`. The attributes of the `rdf:RDF` start tag provide a shorthand for writing down names of XML elements and attributes. The XML element `rdf:Description` (short for http://www.w3.org/1999/02/22-rdf-syntax-ns#Description) is used to define sets of triples that have as subject the IRI specified by the `rdf:about` attribute. The first description block has four sub-elements, where the name of the subelement is an IRI representing an RDF property, e.g., `rdf:type`. Here, each subelement represents one triple. In cases where the object of the triple is also an IRI, the property subelement has no content, and the object IRI is specified using the `rdf:resource` attribute. For example, the line `<foaf:knows rdf:resource="http://example.org/alice#me"/>` corresponds to the triple: `<http://example.org/bob#me> <http://xmlns.com/foaf/0.1/knows> <http://example.org/alice#me>`. When the object of the triple is a literal, the literal value is entered as content of the property element. The datatype is specified as an attribute of the property element. If the datatype is omitted and no language tag is present, the literal is considered to have the datatype `xsd:string`.

```xml
<?xml version="1.0" encoding="utf-8"?>
<!-- Root element of RDF/XML syntax -->
<rdf:RDF
xmlns:dcterms="http://purl.org/dc/terms/"
xmlns:foaf="http://xmlns.com/foaf/0.1/"
xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
xmlns:schema="http://schema.org/">

<!-- rdf:Description declares a set of triples with a shared subject -->
<!-- Subject IRI: http://example.org/bob#me -->
<rdf:Description rdf:about="http://example.org/bob#me">
    
<!-- Triple: <Bob> rdf:type foaf:Person -->
<!-- Indicates Bob is of type Person from the FOAF vocabulary -->
<rdf:type rdf:resource="http://xmlns.com/foaf/0.1/Person"/>

<!-- Triple: <Bob> schema:birthDate "1990-07-04"^^xsd:date -->
<!-- Literal value with datatype xsd:date -->
<schema:birthDate rdf:datatype="http://www.w3.org/2001/XMLSchema#date">1990-07-04</schema:birthDate>

<!-- Triple: <Bob> foaf:knows <Alice> -->
<!-- The object is another IRI; rdf:resource used to link -->
<foaf:knows rdf:resource="http://example.org/alice#me"/>

<!-- Triple: <Bob> foaf:topic_interest <Mona Lisa> -->
<!-- Indicates Bob is interested in the Mona Lisa -->
<foaf:topic_interest rdf:resource="http://www.wikidata.org/entity/Q12418"/>
</rdf:Description>

<!-- Subject IRI: http://www.wikidata.org/entity/Q12418 (Mona Lisa) -->
<rdf:Description rdf:about="http://www.wikidata.org/entity/Q12418">

<!-- Triple: <Mona Lisa> dcterms:title "Mona Lisa"^^xsd:string -->
<!-- String literal without datatype or language tag defaults to xsd:string -->
<dcterms:title>Mona Lisa</dcterms:title>

<!-- Triple: <Mona Lisa> dcterms:creator <Leonardo_da_Vinci> -->
<!-- Creator IRI is the object; rdf:resource used again -->
<dcterms:creator rdf:resource="http://dbpedia.org/resource/Leonardo_da_Vinci"/>
</rdf:Description>

<!-- Subject IRI: http://data.europeana.eu/item/... -->
<rdf:Description rdf:about="http://data.europeana.eu/item/04802/243FA8618938F4117025F17A8B813C5F9AA4D619">

<!-- Triple: <Europeana Item> dcterms:subject <Mona Lisa> -->
<!-- Indicates the item has Mona Lisa as a subject -->
<dcterms:subject rdf:resource="http://www.wikidata.org/entity/Q12418"/>
</rdf:Description>

</rdf:RDF>
```
