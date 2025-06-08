---
title: Getting Started with RDF 
subtitle: Concepts, and Real-World Examples
description: Ever wondered how information on the web becomes interconnected in a machine-readable way? Enter the Resource Description Framework (RDF) a powerful, graph-based model that structures knowledge using simple yet expressive triples, Subject – Predicate - Object. Whether you're exploring how global identifiers like IRIs work, understanding blank nodes, or diving into real-world RDF/XML examples, this guide breaks it all down in clear, digestible terms. Curious how “Harsh is learning RDF” becomes part of a web of linked data?
author: harshsharma
created: 2025-05-23T18:25:24+0530
updated: 2025-06-08T19:47:09+0530
version: 1.1.1
---


### Understanding RDF: The Graph-Oriented Data Model

        - The Resource Description Framework (RDF) is a **graph-oriented data model** utilized to express information.
        - RDF structures data as a collection of **triples**, each one indicating a statement: **Subject -- Predicate -> Object**
        - These triples create a directed and labeled graph:
            - **Subject**: the entity being discussed (a node)
            - **Predicate**: the property or relation (an edge)
            - **Object**: the value or another entity (a node)
            - Example: `"Harsh" -- "isLearning" -> "RDF"` 
                - "Harsh" is the **subject**
                - "isLearning" is the **predicate**
                - "RDF" is the **object**
        - These triples collectively comprise an **RDF statement**.
        - RDF graphs can depict intricate and linked data by connecting multiple triples.
        - Visit [Example](https://www.w3.org/TR/rdf-primer/example-graph.jpg)


### RDF Resources: IRIs, Literals & Blank Nodes

        - In RDF, entities being described are referred to as **resources** — this includes **Subjects**, **Objects**, and even **Predicates**.
        - Resources may represent anything, such as people, documents, physical items, or abstract ideas.
        - Resources can be identified using global identifiers (most commonly used, are IRIs), literals, and Blank Nodes (Predicates cannot be Blank Nodes)
        - A resource represented by an **IRI** is known as its **referent**.
        - A resource expressed by a **literal** is termed its **literal value**.

#### The Global Identifiers

        1. Uniform Resource Identifier (URI)
            - A **URI** is a globally distinctive string applied to identify a resource.
            - It can be utilized as a **name**, **address**, or both.
            - URIs establish the basis of RDF by assigning each idea a consistent identity.
            - Example: `http://example.org/person/harsh` specifies a person named Harsh.
        2. Uniform Resource Locator (URL)
            - A **URL** is a specific kind of URI that also indicates **how and where to retrieve** a resource.
            - It includes a scheme (e.g., `http`, `ftp`) and a network location.
            - Example: `https://example.com/files/data.csv` refers to a file reachable via HTTP.
        3. Uniform Resource Name (URN)
            - A **URN** is a URI type used for **persistent naming** of a resource without showing its location.
            - It lacks access specifics or physical location.
            - Example: `urn:isbn:9780143127796` denotes a book via its ISBN.
        4. International Resource Identifier (IRI)
            - An **IRI** is an expanded form of URI that allows a broader array of Unicode characters.
            - It permits non-ASCII symbols, enabling support for international use.
            - IRIs are valuable for naming web resources in non-English languages.
            - Example: `https://пример.рф/страница` (Russian)  
              In URI format, this would use punycode and percent-encoding.

##### Conclusion

        - All **URLs** are **URIs**, but not all **URIs** are **URLs**.
        - All **URNs** are **URIs**, but not all **URIs** are **URNs**.
        - All **URIs** are valid **IRIs**, but not all **IRIs** are valid **URIs**.

#### Literals

Literals are fundamental values that are not IRIs. Instances of literals include strings like "La Joconde", dates like "the 4th of July, 1990", and numbers like "3.14159". Literals are connected with a datatype that allows such values to be interpreted and parsed correctly. String literals may optionally carry a language tag. For instance, "Léonard de Vinci" might be linked with the "fr" language tag and "李奥纳多·达·文西" with the "zh" language tag.
          Literals may only occur in the object role within a triple.

#### Blank Nodes

These are used when referring to resources without assigning a global identifier.
          Blank nodes may occur in the **subject and object role** of a triple. They are suitable for representing resources without explicitly naming them with an IRI.


### Named Graphs & Multi-Graph Structures in RDF

        - RDF offers a method to organize RDF statements into multiple graphs and assign an IRI to such graphs.
        - The IRI that labels the graph is called the **graph name**.
        - The graph name, that is the IRI labeling the group, may represent anything — for example, the "Source" or "Author" of the RDF content.
        - The person reading the data is expected to understand the meaning through their community’s practices.


### Key RDF Vocabularies: RDFS, OWL, FOAF & SKOS Overview

        - RDF Vocabularies are sets of **predicates** (also called **properties**) and **classes** that provide shared meaning for RDF content.
        - They specify a unified collection of terms to describe resources in a uniform and interoperable manner.
        - Vocabularies help data from various sources be connected and interpreted through mutual understanding of terms.
        - Examples of widely-used RDF vocabularies:
            - **RDFS (RDF Schema)**: Offers basic elements for ontology description, such as classes (`rdfs:Class`) and properties (`rdfs:subClassOf`, `rdfs:domain`, `rdfs:range`).
            - **OWL (Web Ontology Language)**: Adds more expressive features to RDFS for defining complex associations and constraints among classes and properties.
            - **FOAF (Friend of a Friend)**: Designed to describe individuals, their actions, and their relationships with other people and items (e.g., `foaf:name`, `foaf:knows`).
            - **SKOS (Simple Knowledge Organization System)**: Created for modeling knowledge systems like classification plans, taxonomies, and thesauri.
        - Custom vocabularies may also be defined using IRIs, allowing communities to build terms specific to their field.
        - Reusing well-known vocabularies enhances RDF data's interoperability and facilitates its integration with external datasets.


### RDF in Action: XML Example of Triples & Descriptions

In RDF/XML RDF triples are specified within an XML element rdf:RDF (lines 2 and 20). The attributes of the rdf:RDF start tag (lines 3-6) provide a shorthand for writing down names of XML elements and attributes. The XML element rdf:Description (short for http://www.w3.org/1999/02/22-rdf-syntax-ns#Description) is used to define sets of triples that have as subject the IRI specified by the about attribute. The first description block (line 7-12) has four sub-elements. The name of the subelement is an IRI representing an RDF property, e.g., rdf:type (line 8). Here, each subelement represents one triple. In cases where the object of the triple is also an IRI the property subelement has no content and the object IRI is specified using the rdf:resource attribute (lines 8, 10-11, 15 and 18). For example, line 10 corresponds to the triple:
`<http://example.org/bob#me> <http://xmlns.com/foaf/0.1/knows> <http://example.org/alice#me>`
When the object of the triple is a literal the literal value is entered as content of the property element (lines 9 and 14). The datatype is specified as attribute of the property element (line 9). If the datatype is omitted (line 14) and no language tag is present the literal is considered to have the datatype xsd:string.

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


### REFERENCES:

        - [RDF 1.1 Primer](https://www.w3.org/TR/rdf-primer/)
