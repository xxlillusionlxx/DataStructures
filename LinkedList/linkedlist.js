function addIt(list) {
	if(list.next === null)
		return list.data;
	else {
		return (list.data + addIt(list.next));
	}
}

var linkedList = (function () {
	
	function Node() {
		this.data = null;
		this.next = null;
	}

	var head = null;
	var length = 0;

	return {
		add: function(element) {

			var node = new Node();
			node.data = element;

			if(head === null) {
				head = node;
			} else {
				var currentNode = head;
				while(currentNode.next) {
					currentNode = currentNode.next;
					console.log("Data: " + currentNode.data);
				}
				
				currentNode.next = node;
				console.log("Value added: " + currentNode.next.data);
			}

			length++;
		},
		populate: function(element) { // Populate list with array
			if(element.length < 1) {
				console.log("Array is empty.");
				return 0;
			} else {
				for(var i  = 0; i < element.length; i++) {
					this.add(element[i]);
				}
			}

		},
		remove: function(element) {
			currentNode = head;
			var previousNode;
			if(head === null)
				return -1;
			else if( (head.next === null) && (head.data === element) ) { // Only one element in the list
				head.data = null;
				if(length > 0)
					length--;
				console.log('Removal successful');
				return length;
			}

			//*******
			//TODO: Fix this part. It skips over the first element in the list, otherwise removal works fine
			//*******
			previousNode = currentNode;
			
			while(currentNode.next) {
				
				currentNode = currentNode.next;

				if(currentNode.data === element) {
					previousNode.next = currentNode.next;
					currentNode = previousNode;
					length--;
					console.log('Removal successful');
					return 1;
				}
				
			}
		},
		//*******
		//TODO: Implement this method
		//*******
		indexOf: function(element) {

			if(head === null)
				return -1;
		},
		size: function() {
			return length;
		},
		toString: function() {
			var string = '';

			if(head === null) {
				console.log('List is empty; nothing to print.')
			} else if(head.data === null) {
				string += 'List is empty';
			} else {
				currentNode = head;
				while(currentNode) {
					string += currentNode.data.toString() + ',';
					currentNode = currentNode.next;
				}
			}
			return string;
		},
		toArray: function() {
			var array = [];
			if(head === null) {
				alert('List is empty; nothing to put in array.');
			} else if(head.data === null) {
				alert('List is empty');
			} else {
				currentNode = head;
				while(currentNode) {
					array.push(currentNode.data);
					currentNode = currentNode.next;
				}
			}

			return array;
		},
		generateGraph: function() {
			var arr = [];
			
			for(var j = 0; j < length; j++) {
				var tmp = j;
				var tmp2 = j+1;
				if(j === length-1)
					arr[j] = { "source": tmp, "target":tmp};
				else
					arr[j] = { "source": tmp, "target": tmp2};
			}

			var json = JSON.stringify(arr);
			console.log("JSON:\n"+ json +"\n");

			return arr;
		}
	};
})();
