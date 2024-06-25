# Subgraph status banner

A Ui component to display subgraph's status.


[Demo](https://subgraph-status.vercel.app) 🚀

---

## Getting Started 
	

    yarn add subgraph-status

--- 

### Usage

#### UI Display

 Exports StatusBanner and StatusCard, to display status of multiple subgraphs with a carousel effect.

    import {StatusBanner, StatusCard} from "subgraph-status";
    
	function  App()  {
		return (
            <>
		    <StatusBanner subgraphs={[{name: "Subgraph 1" , url : "subgraphUrl"}]}/>
		    <StatusCard subgraphs={[{name: "Subgraph 1" , url : "subgraphUrl"}]}/>
            </>
		);
	}

#### useWatcher hook

Exports a hook that takes in the subgraphs and return the Statuses respectively. Use this if you want to build your own UI around it.

    import { useWatcher } from "subgraph-status";
    
	function  App()  {
        const {statuses, isLoadingIds, isLoadingStatus} = useWatcher([{name: "Subgraph 1" , url : "subgraphUrl"}, {name: "Subgraph 2" , url : "subgraphUrl"}]);

		return (
            <>
                // Display statuses.
            </>
		);
	}

> Subgraph url is the query url that is used to make gql requests.

---

### Customizations 
- **[watcherOptions](https://github.com/Harman-singh-waraich/subgraph-status/blob/24bdc388ed575b77dd104ac9ff529d6817ebb540/src/hooks/useWatcher.ts#L13)**  :- options to customize `threshold` and `interval` for `useWatcher` hook.
    - threshold : Blocks after which a subgraph will be marked as lagging. `Default - 50,000 Blocks`
    - interval : Interval to check subgraphs health.` Default - 30 sec`

- **[carouselOptions](https://react-slick.neostack.com/docs/api)** :- Options to customize carousel

- **autoHide** :- Hide banner if all subgraphs are healthy, false by default

- **theme**:- optional prop to override the default theme of Banner and Card.

- **textFormatter**:-  Render custom text for each status slide.


  