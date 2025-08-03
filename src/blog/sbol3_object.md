---
title: "Guide to Creating SBOL Documents"
description: "A version-agnostic guide to creating SBOL 2 and SBOL 3 objects using Python, perfect for developers new to the Synthetic Biology Open Language."
date: 2025-07-28
---

### Introduction

The Synthetic Biology Open Language (SBOL) is a data standard for sharing and documenting synthetically engineered biological designs. Whether you're working with the established SBOL 2 standard or the newer SBOL 3, Python provides powerful libraries to help you create and manage your data. This guide will walk you through creating SBOL documents in both versions, using side-by-side examples to highlight the key differences and similarities.

### Getting Started: The SBOL Document

The first step in any SBOL project is to create a `Document` object, which acts as a container for all your SBOL data. It’s also a good practice to set a default namespace for your project, which helps in uniquely identifying your objects.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

# Create a new SBOL3 document
doc = sbol3.Document()

# Set the namespace to avoid warnings
namespace = "http://example.org/my_project"
sbol3.set_namespace(namespace)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2

# Create a new SBOL2 document
doc = sbol2.Document()

# Set the default homespace for SBOL objects
sbol2.setHomespace('http://sbols.org/example')
```

</TabItem>
</Tabs>

### Creating a Component and a Sequence

In SBOL, a `Component` (or `ComponentDefinition` in SBOL2) is a fundamental object representing a biological entity, such as a gene or a protein. A `Sequence` object stores the actual genetic or amino acid sequence.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

sbol3.set_namespace("http://example.org/my_project")
doc = sbol3.Document()

# Create a Sequence object
sequence = sbol3.Sequence(
    identity="sequence_1",
    elements="ATGCATGC",
    encoding=sbol3.IUPAC_DNA_ENCODING
)

# Create a Component object
component = sbol3.Component(
    identity="component_1",
    types=[sbol3.SBO_DNA]
)

# Add the sequence to the component
component.sequences.append(sequence)

# Add both objects to the document
doc.add(sequence)
doc.add(component)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2

sbol2.setHomespace('http://sbols.org/example')
doc = sbol2.Document()

# Create a Sequence object
sequence = sbol2.Sequence(
    displayId='sequence_1',
    elements='AGCT',
    encoding=sbol2.SBOL_ENCODING_IUPAC
)

# Create a ComponentDefinition object
component_definition = sbol2.ComponentDefinition(
    displayId='component_1',
    types=[sbol2.BIOPAX_DNA]
)

# Add the sequence to the component definition
component_definition.sequences.append(sequence)

# Add both objects to the document
doc.addSequence(sequence)
doc.addComponentDefinition(component_definition)
```

</TabItem>
</Tabs>

### Building Designs with Sub-Components

SBOL allows you to build hierarchical designs by including components as features within other components. This is the key to modular, scalable bio-design. In SBOL3, this is done with `SubComponent`, while in SBOL2, this is achieved by adding a `Component` to a `ComponentDefinition`.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

sbol3.set_namespace("http://example.org/subcomponents")

# Define the components to be used as subcomponents
p_tetr = sbol3.Component("p_tetr", types=[sbol3.SBO_DNA])
tetr_cds = sbol3.Component("tetr_cds", types=[sbol3.SBO_DNA])

# Create a parent component
tetr_cassette = sbol3.Component("tetr_cassette", types=[sbol3.SBO_DNA])

# Instantiate p_tetr as a SubComponent
sub_promoter = sbol3.SubComponent(instance_of=p_tetr)
tetr_cassette.features.append(sub_promoter)

# Instantiate tetr_cds as a SubComponent
sub_cds = sbol3.SubComponent(instance_of=tetr_cds)
tetr_cassette.features.append(sub_cds)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2

sbol2.setHomespace('http://sbols.org/examples')
doc = sbol2.Document()

# Create ComponentDefinitions for the parts
promoter_def = sbol2.ComponentDefinition('pTetR', sbol2.BIOPAX_DNA)
cds_def = sbol2.ComponentDefinition('tetr_cds', sbol2.BIOPAX_DNA)

# Create a parent ComponentDefinition for the cassette
gene_cassette = sbol2.ComponentDefinition("gene_cassette", types=[sbol2.SO_PLASMID])

# Create a Component for the promoter and add it to the cassette
promoter_component = gene_cassette.components.create('promoter_component')
promoter_component.definition = promoter_def.identity

# Create a Component for the CDS and add it to the cassette
cds_component = gene_cassette.components.create('cds_component')
cds_component.definition = cds_def.identity
```

</TabItem>
</Tabs>

### Describing Functional Interactions

A biological design is more than just a collection of parts; it's about how those parts interact. The `Interaction` object describes these functional relationships, such as repression or activation.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

sbol3.set_namespace("http://example.org/interactions")

# Assume components for TetR protein and the pTet promoter
tetr_protein = sbol3.Component("tetr_protein", types=[sbol3.SBO_PROTEIN])
ptet_promoter = sbol3.Component("ptet_promoter", types=[sbol3.SBO_DNA])

# Create an Interaction for repression
interaction = sbol3.Interaction(
    identity="tetr_repression",
    types=[sbol3.SBO_INHIBITION]
)

# Specify the participants
interaction.participations.append(
    sbol3.Participation(
        roles=[sbol3.SBO_INHIBITOR],
        participant=tetr_protein.identity
    )
)
interaction.participations.append(
    sbol3.Participation(
        roles=[sbol3.SBO_PROMOTER],
        participant=ptet_promoter.identity
    )
)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2

sbol2.setHomespace('http://sbols.org/CRISPR_Example')
doc = sbol2.Document()

# Define ComponentDefinitions
protein_def = sbol2.ComponentDefinition('tetr_protein', sbol2.BIOPAX_PROTEIN)
promoter_def = sbol2.ComponentDefinition('ptet_promoter', sbol2.BIOPAX_DNA)
doc.addComponentDefinition([protein_def, promoter_def])

# Create a ModuleDefinition to contain the interaction
module_def = sbol2.ModuleDefinition('tetr_repression_module')
doc.addModuleDefinition(module_def)

# Create FunctionalComponents for the participants
inhibitor_fc = module_def.functionalComponents.create('inhibitor_fc')
inhibitor_fc.definition = protein_def.identity
inhibited_fc = module_def.functionalComponents.create('inhibited_fc')
inhibited_fc.definition = promoter_def.identity

# Create the Interaction
interaction = module_def.interactions.create('protein_protein_interaction')
interaction.types = [sbol2.SBO_INHIBITION]

# Specify the participants
p1 = interaction.participations.create('p_inhibitor')
p1.roles = [sbol2.SBO_INHIBITOR]
p1.participant = inhibitor_fc.identity

p2 = interaction.participations.create('p_inhibited')
p2.roles = [sbol2.SBO_PROMOTER]
p2.participant = inhibited_fc.identity
```

</TabItem>
</Tabs>

### Linking to Quantitative Models

To bridge the gap between design and simulation, the `Model` object links your SBOL `Component` to a quantitative mathematical model, often in a standard format like SBML.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

sbol3.set_namespace("http://example.org/models")

# Create a Model that references an external SBML file
model = sbol3.Model(
    identity="toggle_switch_model",
    source="http://models.org/biomodels/BIOMD0000000012.xml",
    language=sbol3.SBML_LANGUAGE,
    framework=sbol3.SBO_CONTINUOUS_FRAMEWORK
)

# Associate the model with a Component
circuit = sbol3.Component("toggle_switch_circuit", types=[sbol3.SBO_DNA])
circuit.models.append(model)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2
from sbol2.constants import EDAM_SBML, SBO_CONTINUOUS

sbol2.setHomespace('http://sbols.org/example')

# Create a Model object
model = sbol2.Model(
    displayId='my_model', 
    source='http://www.ebi.ac.uk/biomodels-main/BIOMD0000000256',
    language=EDAM_SBML,
    framework=SBO_CONTINUOUS
)

# Associate with a ComponentDefinition
circuit = sbol2.ComponentDefinition('toggle_switch_circuit')
circuit.models.add(model.identity)
```

</TabItem>
</Tabs>

### Organizing with Collections

As your projects grow, you’ll need a way to organize your SBOL objects. The `Collection` object is perfect for this, allowing you to group related objects together.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
import sbol3

sbol3.set_namespace("http://example.org/my_project")
doc = sbol3.Document()

component = sbol3.Component("component_1", types=[sbol3.SBO_DNA])
doc.add(component)

# Create a Collection and add the component
collection = sbol3.Collection(
    identity='collection_1',
    members=[component]
)
doc.add(collection)
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
import sbol2

sbol2.setHomespace('http://sbols.org/example')
doc = sbol2.Document()

component_def = sbol2.ComponentDefinition('component_1')
doc.addComponentDefinition(component_def)

# Create a Collection and add the component
collection = sbol2.Collection('my_collection')
collection.members.append(component_def.identity)
doc.addCollection(collection)
```

</TabItem>
</Tabs>

### Saving and Validating Your Document

Finally, after creating your SBOL objects, you should save your document and validate it to ensure it complies with the SBOL standard.

<Tabs>
<TabItem value="sbol3" label="SBOL3">

```python
# Assuming 'doc' is your sbol3.Document from the examples above
output_path = "my_sbol3_document.xml"
doc.write(output_path)

# Validate the document
validation_report = doc.validate()
if validation_report.errors:
    print("Validation Errors:", validation_report.errors)
else:
    print("SBOL3 document is valid!")
```

</TabItem>
<TabItem value="sbol2" label="SBOL2">

```python
# Assuming 'doc' is your sbol2.Document from the examples above
output_path = "my_sbol2_document.xml"
doc.write(output_path)

# Validate the document
validation_report = doc.validate()
if validation_report == 'Valid.':
    print("SBOL2 document is valid!")
else:
    print("Validation Failed:", validation_report)
```

</TabItem>
</Tabs>

Validation is a crucial step that helps you catch errors early and ensures your data is interoperable with other SBOL-compliant tools. With these examples, you have the foundation to create structured, hierarchical, and functionally annotated SBOL documents in either SBOL2 or SBOL3 for your synthetic biology projects.
