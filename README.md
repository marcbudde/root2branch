#A fluent API for constructing tree structures 

This package consists of a builder, that can be used to construct tree structures with an arbitrary payload for each node.

builder points to last created node (downward movement)
builder moves upward by closing current branch
builder.node allows access to the node on the current level