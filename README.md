# Subgraph status banner

A Ui component to display subgraph's status.

## Getting Started 
	

    yarn add @tractors/subgraph-status

### Usage

    import {Banner} from "@tractors/subgraph-status";

	function  App()  {
		return (
		<Banner subgraphs={[{name: "Subgraph 1" , url : "subgraphUrl"]}/>
		);
	}


### Customizations 
- watcherOptions :- options to customize `threshold` and `interval` for `useWatcher` hook.
- carouselOptions:- Options to customize carousel