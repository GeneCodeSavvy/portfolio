---
title: SBOL Specification
subtitle: A brief disscussion
description: Designing synthetic biology systems is challenging due to poor standardization and lack of machine-readable formats. SBOL3 addresses this by using RDF to represent biological designs in a structured, semantic format. It supports modular design, provenance tracking, and interoperability. Tools like pySBOL3 make it easy to create and serialize these designs. RDF triples (subject–predicate–object) form the backbone of this data model.
author: harshsharma
categories: 
  - Google Summer of Code
  - Synthetic Biology
created: 2025-05-31T16:46:03+0530
updated: 2025-06-08T17:46:01+0530
version: 1.1.1
---


### Challenges in Designing Systems in Synthetic Biology.

Synthetic Biology draws from multiple fields, including Genetics, Molecular Biology, and Metabolic Engineering. However, tools from these areas are not always directly applicable. Designing synthetic systems requires integrating diverse information, but the absence of standardized solutions leads to low reproducibility and high failure rates.
For example:
- FASTA encodes little beyond sequence data.
- GenBank and Swiss-Prot offer more sequence feature details than FASTA but are not suited for layered designs typical in engineering.
- Systems Biology Markup Language (SBML) represents biological processes well but lacks support for associated nucleotide and amino acid sequences.


#### TLDR

- lack of a robust, machine-readable format capturing the specific needs of Synthetic Biology.
- lack of streamlined workflows for the "Design-Build-Test-Learn" cycle.



### Overview of Synthetic Biology Open Language (SBOL).

The Synthetic Biology Open Language (SBOL) was developed as a standard to specify and exchange biological design information in Synthetic Biology.
_SBOL_ uses Semantic Web practices and [Resource Description Framework, such as IRIs](#gsocrdfmd) and ontologies to clearly define biological systems, offering serialization formats for encoding this information in electronic files.
_SBOL_ also enables tracking the origin, history, and ownership of designs.
SBOL3 is the latest version of the SBOL standard as of 2025. We can create SBOL3 documents with the python library [pySBOL3](https://github.com/SynBioDex/pySBOL3). Installing the library is a simple terminal command -
```bash
pip3 install sbol3
```
Terminologies
1. Namespace: A unique identifier assigned to your SBOL document that distinguishes its components from those in other documents. It ensures all elements are uniquely identifiable, supporting data exchange and interoperability.
2. Objects: Fundamental building blocks in SBOL used to represent structural or functional elements of a design. For instance, a Sequence object defines a nucleotide or protein sequence.
3. Provenance: Metadata describing the origin, authorship, and modification history of an SBOL document, useful for tracking design evolution and ownership.


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

Short description about the tags found in our SBOL3 document.
1. `<rdf:RDF>`  
   This is the root element of any RDF/XML document. It declares the namespaces used throughout the file.  
    - `xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"` tells the parser we are using RDF syntax.
    - `xmlns:sbol="http://sbols.org/v3#"` indicates that tags prefixed with `sbol:` come from the SBOL vocabulary.
2. `<rdf:Description>`  
   This tag describes a resource
3. `<sbol:displayId>`  
   This is a human-readable identifier from the SBOL vocabulary. It assigns a name to the SBOL object.
4. `<rdf:type>`  
   This tag defines what type of object the resource is. It links the resource to a class in an ontology.  
    - For the DNA component: `<rdf:type rdf:resource="http://sbols.org/v3#Component"/>`  
    - For the sequence: `<rdf:type rdf:resource="http://sbols.org/v3#Sequence"/>`
5. `<sbol:hasNamespace>`  
   Indicates the namespace to which the object belongs. This ensures every object has a globally unique IRI. It helps tools differentiate between identically named components across documents.
6. `<sbol:type>`  
   Provides a semantic category for the Component using the Systems Biology Ontology (SBO).  
    - In this example, the SBO term `SBO:0000251` denotes a DNA molecule.
7. `<sbol:hasSequence>`  
   Establishes a link from the Component to its associated Sequence. It uses the IRI of the Sequence object as its value.
8. `<sbol:elements>`  
   This is a literal property containing the actual sequence string, such as "atgctagctagctacgtagctagctgact". It encodes the nucleotides or amino acids.
9. `<sbol:encoding>`  
   Specifies the format of the sequence data. The IRI points to a standard term (in this case, EDAM format) to indicate it’s DNA encoded using IUPAC notation.


### Triples in SBOL

RDF data is fundamentally structured as **triples**, following the pattern:  
**Subject – Predicate – Object**
Each triple represents a single piece of information. Let’s apply this to our SBOL example:

#### Example Triple from the SBOL Document

```xml
<rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna">
    <sbol:displayId>example_dna</sbol:displayId>
</rdf:Description>
```
This can be read as:
- **Subject**: `https://example@edu/lab_name/design_name/example_dna`  
  → the resource we are describing (a DNA component)
- **Predicate**: `sbol:displayId`  
  → the property or relationship (what we want to say about the subject)
- **Object**: `"example_dna"`  
  → the value assigned to that property
  RDF allows expressing many such triples, creating a graph-like structure where each node (resource) can have multiple outgoing relationships (predicates) pointing to other nodes (objects) or literal values.

```xml
<rdf:Description rdf:about="https://example@edu/lab_name/design_name/example_dna">
    <rdf:type rdf:resource="http://sbols.org/v3#Component"/>
</rdf:Description>
```
- **Subject**: `https://example@edu/lab_name/design_name/example_dna` (implicit from the enclosing `<rdf:Description>`)
- **Predicate**: `rdf:type`
- **Object**: `http://sbols.org/v3#Component`
  This tells us that the subject is a `Component`.


### Conclusion

RDF’s triple structure allows SBOL to describe complex biological systems in a modular, precise, and machine-interpretable way.  
Each biological entity becomes a **node** with properties linking it to data or to other entities. This makes SBOL not just a file format, but a part of a broader semantic ecosystem where biological data can be integrated, queried, and reasoned over.

With this model, SBOL ensures that synthetic biology designs can fit elegantly in the "Design-Build-Test-Learn" workflows.

At this point, you should have a solid foundation in how SBOL3 leverages RDF to represent biological designs. We've covered the basics of creating SBOL objects using pySBOL3, how those objects are serialized in RDF/XML, and how to interpret that structure using the subject–predicate–object model.

Thank you for reading.
