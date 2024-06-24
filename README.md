# Subgraph status banner

A Ui component to display subgraph's status.

## Getting Started 
	

    yarn add subgraph-status

### Usage

    import {StatusBanner, StatusCard} from "subgraph-status";
    
	function  App()  {
		return (
            <>
		    <StatusBanner subgraphs={[{name: "Subgraph 1" , url : "subgraphUrl"]}/>
		    <StatusCard subgraphs={[{name: "Subgraph 1" , url : "subgraphUrl"]}/>
            </>
		);
	}


### Customizations 
- **[watcherOptions](https://github.com/Harman-singh-waraich/subgraph-status/blob/24bdc388ed575b77dd104ac9ff529d6817ebb540/src/hooks/useWatcher.ts#L13)**  :- options to customize `threshold` and `interval` for `useWatcher` hook.
- **[carouselOptions](https://react-slick.neostack.com/docs/api)** :- Options to customize carousel
- **autoHide** : Hide banner if all subgraphs are healthy, false by default
- **theme**: optional prop to override the default theme of Banner and Card.