---
title: Intro to SBOL Specification
subtitle: A brief disscussion
description: Designing synthetic biology systems is challenging due to poor standardization and lack of machine-readable formats. SBOL3 addresses this by using RDF to represent biological designs in a structured, semantic format. It supports modular design, provenance tracking, and interoperability. Tools like pySBOL3 make it easy to create and serialize these designs. RDF triples (subject–predicate–object) form the backbone of this data model.
author: harshsharma
categories: 
  - Google Summer of Code
  - Synthetic Biology
date: 2025-06-08T17:46:01+0530
version: 1.1.1
---


### Challenges in Designing Systems in Synthetic Biology.

Synthetic Biology draws from multiple fields, including Genetics, Molecular Biology, and Metabolic Engineering. However, tools from these areas are not always directly applicable. Designing synthetic systems requires integrating diverse information, but the absence of standardized solutions leads to low reproducibility and high failure rates.

For example, existing formats have limitations. FASTA encodes little beyond sequence data, while GenBank and Swiss-Prot, despite offering more sequence feature details, are not suited for the layered designs typical in engineering. Similarly, the Systems Biology Markup Language (SBML) represents biological processes well but lacks support for associated nucleotide and amino acid sequences. These issues highlight the lack of a robust, machine-readable format that captures the specific needs of Synthetic Biology and the absence of streamlined workflows for the "Design-Build-Test-Learn" cycle.


### Overview of Synthetic Biology Open Language (SBOL).

The Synthetic Biology Open Language (SBOL) was developed as a standard to specify and exchange biological design information in Synthetic Biology.
_SBOL_ uses Semantic Web practices and [Resource Description Framework, such as IRIs](#gsocrdfmd) and ontologies to clearly define biological systems, offering serialization formats for encoding this information in electronic files.
_SBOL_ also enables tracking the origin, history, and ownership of designs.
SBOL3 is the latest version of the SBOL standard as of 2025. We can create SBOL3 documents with the python library [pySBOL3](https://github.com/SynBioDex/pySBOL3). Installing the library is a simple terminal command -
```bash
pip3 install sbol3
```
Before we proceed, it's helpful to understand a few key terminologies. A **Namespace** is a unique identifier for an SBOL document, ensuring its components are distinguishable from those in other documents to support data exchange. The fundamental building blocks in SBOL are **Objects**, which represent structural or functional elements of a design, such as a Sequence object defining a nucleotide or protein sequence. Finally, **Provenance** refers to metadata that describes the origin, authorship, and modification history of an SBOL document, which is useful for tracking a design's evolution and ownership.


### Creating basic SBOL3 Objects:

```python
import sbol3

# Set the default namespace for the document
sbol3.set_namespace('https://example@edu/lab_name/design_name/')
# NOTE: A namespace can be any valid IRI (Internationalized Resource Identifier). 
# While it is often written as a URL for convenience and readability, it does not need to point to an actual web address.

# Create a new SBOL3 document
doc = sbol3.Document()

# Create a Component for a simple DNA sequence
component = sbol3.Component('example_dna', sbol3.SBO_DNA)
sequence = sbol3.Sequence('example_dna_sequence', elements='atgctagctagctacgtagctagctgact', encoding=sbol3.IUPAC_DNA_ENCODING)

# Add the Component to the document
doc.add(component)

# Add the Sequence to the document
doc.add(sequence)

component.sequences.append(sequence)

# Print the document
print(doc)

output_file_json = 'example_dna.xml'
doc.write(output_file_json, sbol3.RDF_XML)
print(f'SBOL document saved to {output_file_json}')
```

This script creates a basic SBOL3 document in XML format using the pySBOL3 library. It defines a DNA component and its corresponding sequence, adds them to the document, and writes the document to a file.
pySBOL3 supports multiple output formats, including RDF/XML, Turtle, Triples, and JSON. In this example, we use the XML format because it's the one I'm most familiar with. I'll use this format to explain how the Resource Description Framework (RDF) is used in the SBOL.

```xml
<?xml version="1.0" encoding="utf-8"?>
<rdf:RDF
    xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
    xmlns:sbol="http://sbols.org/v3#"
    >
    <rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna">
        <sbol:displayId>example_dna</sbol:displayId>
        <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
        <sbol:hasNamespace rdf:resource="https://example@edu/lab_name/design_name/"/>
        <sbol:type rdf:resource="https://identifiers.org/SBO:0000251"/>
        <sbol:hasSequence rdf:resource="https://example@edu/lab_name/design_name/example_dna_sequence"/>
    </rdf:Description>
    <rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna_sequence">
        <sbol:displayId>example_dna_sequence</sbol:displayId>
        <rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>
        <sbol:hasNamespace rdf:resource="https://example@edu/lab_name/design_name/"/>
        <sbol:elements>atgctagctagctacgtagctagctgact</sbol:elements>
        <sbol:encoding rdf:resource="https://identifiers.org/edam:format_1207"/>
    </rdf:Description>
</rdf:RDF>
```


### Resource Data Framework (RDF) in SBOL

The XML block shown above is the serialized RDF representation of the SBOL3 document. It follows the RDF/XML syntax, which is a standard format for expressing RDF data in XML.

Let's break down the tags found in our SBOL3 document. The root element is `<rdf:RDF>`, which declares the necessary namespaces, such as `xmlns:rdf` for RDF syntax and `xmlns:sbol` for the SBOL vocabulary. Within this, `<rdf:Description>` is used to describe a resource. Each resource has properties, like `<sbol:displayId>`, a human-readable identifier that assigns a name to the SBOL object.

The `<rdf:type>` tag is crucial as it defines the object's type by linking it to a class in an ontology, for example, specifying a resource as an `sbol:Component` or `sbol:Sequence`. To ensure every object has a globally unique IRI, `<sbol:hasNamespace>` indicates the namespace to which the object belongs, helping tools differentiate between identically named components across documents. Further semantic categorization is provided by `<sbol:type>`, which uses the Systems Biology Ontology (SBO) to classify a component, such as using `SBO:0000251` to denote a DNA molecule.

Relationships between resources are also defined. For instance, `<sbol:hasSequence>` establishes a link from a Component to its associated Sequence using the Sequence's IRI. The actual sequence data is contained within the `<sbol:elements>` tag as a literal string. Finally, `<sbol:encoding>` specifies the format of the sequence data, pointing to a standard term like the EDAM format for DNA encoded with IUPAC notation.


### Triples in SBOL

RDF data is fundamentally structured as **triples**, following the pattern:  
**Subject – Predicate – Object**
Each triple represents a single piece of information. Let’s apply this to our SBOL example:

#### Example Triple from the SBOL Document

Consider the following XML snippet:
```xml
<rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna">
    <sbol:displayId>example_dna</sbol:displayId>
</rdf:Description>
```
This snippet can be read as a triple. The **Subject** is `https://example@edu/lab_name/design_name/example_dna`, which is the resource being described (a DNA component). The **Predicate** is `sbol:displayId`, representing the property or relationship. The **Object** is `"example_dna"`, which is the value assigned to that property. RDF allows expressing many such triples, creating a graph-like structure where each node (resource) can have multiple outgoing relationships (predicates) pointing to other nodes (objects) or literal values.

As another example:
```xml
<rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna">
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
</rdf:Description>
```
Here, the **Subject** is again `https://example@edu/lab_name/design_name/example_dna`, which is implicit from the enclosing `<rdf:Description>`. The **Predicate** is `rdf:type`, and the **Object** is `http://sbols.org/v3#Component`. This triple tells us that the subject is a `Component`.


### Conclusion

RDF’s triple structure allows SBOL to describe complex biological systems in a modular, precise, and machine-interpretable way.  
Each biological entity becomes a **node** with properties linking it to data or to other entities. This makes SBOL not just a file format, but a part of a broader semantic ecosystem where biological data can be integrated, queried, and reasoned over.

With this model, SBOL ensures that synthetic biology designs can fit elegantly in the "Design-Build-Test-Learn" workflows.

At this point, you should have a solid foundation in how SBOL3 leverages RDF to represent biological designs. We've covered the basics of creating SBOL objects using pySBOL3, how those objects are serialized in RDF/XML, and how to interpret that structure using the subject–predicate–object model.

Thank you for reading.
