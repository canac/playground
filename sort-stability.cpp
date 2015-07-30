#include <iostream>
#include <queue>

struct Item {
  int key;
  int value;

  bool operator==(const Item& other) {
    return key == other.key;
  }
  bool operator!=(const Item& other) {
    return key != other.key;
  }
  bool operator<(const Item& other) {
    return key < other.key;
  }
  bool operator<=(const Item& other) {
    return key <= other.key;
  }
  bool operator>(const Item& other) {
    return key > other.key;
  }
  bool operator>=(const Item& other) {
    return key >= other.key;
  }

  friend std::ostream& operator<<(std::ostream& stream, const Item& item) {
    return stream << "(" << item.key << ", " << item.value << ")";
  }

  int SubKey(int i) const {
    return key;
  }
};

template<class ItemType>
void Swap(ItemType& item1, ItemType& item2) {
// Post: Contents of item1 and item2 have been swapped.
  ItemType tempItem = item1;
  item1 = item2;
  item2 = tempItem;
}


template<class ItemType>
int MinIndex(ItemType values[], int startIndex, int endIndex)
// Post: Returns the index of the smallest value in
//       values[startIndex]..values[endIndex].
{
  int indexOfMin = startIndex;
  for (int index = startIndex + 1; index <= endIndex; index++)
    if (values[index] < values[indexOfMin])
      indexOfMin = index;
  return indexOfMin;
}


template<class ItemType>
void SelectionSort(ItemType values[], int numValues)
// Post: The elements in the array values are sorted by key.
{
  int endIndex = numValues-1;
  for (int current = 0; current < endIndex; current++)
    Swap(values[current],
         values[MinIndex(values, current, endIndex)]);
}


template<class ItemType>
void InsertItem(ItemType values[], int startIndex, int endIndex)
// Post: values[0]..values[endIndex] are now sorted.
{
  bool finished = false;
  int current = endIndex;
  bool moreToSearch = (current != startIndex);

  while (moreToSearch && !finished)
  {
    if (values[current] < values[current-1])
    {
      Swap(values[current], values[current-1]);
      current--;
      moreToSearch = (current != startIndex);
    }
    else
      finished = true;
  }
}

template<class ItemType>
void InsertionSort(ItemType values[], int numValues)
// Post: The elements in the array values are sorted by key.
{
  for (int count = 0; count < numValues; count++)
    InsertItem(values, 0, count);
}


template<class ItemType>
void BubbleUp(ItemType values[], int startIndex, int endIndex)
// Post: Adjacent pairs that are out of order have been
//       switched between values[startIndex]..values[endIndex]
//       beginning at values[endIndex].
{
  for (int index = endIndex; index > startIndex; index--)
    if (values[index] < values[index-1])
      Swap(values[index], values[index-1]);
}

template<class ItemType>
void BubbleSort(ItemType values[], int numValues)
// Post: The elements in the array values are sorted by key.
{
  int current = 0;

  while (current < numValues - 1)
  {
    BubbleUp(values, current, numValues-1);
    current++;
  }
}


typedef int ItemType;
template<class ItemType>
void ShortBubble(ItemType values[], int numValues)
// Post: The elements in the array values are sorted by key.
//       The process stops as soon as values is sorted.
{
  int current = 0;
  bool sorted = false;
  while (current < numValues - 1 && !sorted)
  {
    BubbleUp2(values, current, numValues-1, sorted);
    current++;
  }
}

template<class ItemType>
void BubbleUp2(ItemType values[], int startIndex, int endIndex,
     bool& sorted)
// Post: Adjacent pairs that are out of order have been switched
//       between values[startIndex]..values[endIndex] beginning at
//       values[endIndex].
//       sorted is false if a swap was made; otherwise, true.
{
  sorted = true;
  for (int index = endIndex; index > startIndex; index--)
    if (values[index] < values[index-1])
    {
      Swap(values[index], values[index-1]);
      sorted = false;
    }
}


template<class ItemType>
void Merge (ItemType values[], int leftFirst, int leftLast,
     int rightFirst, int rightLast)
// Post: values[leftFirst]..values[leftLast] and
//       values[rightFirst]..values[rightLast] have been merged.
//       values[leftFirst]..values[rightLast] is now sorted.
{
  ItemType tempArray[10];
  int index = leftFirst;
  int saveFirst = leftFirst;

  while ((leftFirst <= leftLast) && (rightFirst <= rightLast))
  {
    if (values[leftFirst] < values[rightFirst])
    {
      tempArray[index] = values[leftFirst];
      leftFirst++;
    }
    else
    {
      tempArray[index] = values[rightFirst];
      rightFirst++;
    }
    index++;
  }

  while (leftFirst <= leftLast)
  // Copy remaining items from left half.

  {
    tempArray[index] = values[leftFirst];
    leftFirst++;
    index++;
  }

  while (rightFirst <= rightLast)
  // Copy remaining items from right half.
  {
    tempArray[index] = values[rightFirst];
    rightFirst++;
    index++;
  }

  for (index = saveFirst; index <= rightLast; index++)
    values[index] = tempArray[index];
}

template<class ItemType>
void MergeSort(ItemType values[], int first, int last)
// Post: The elements in values are sorted by key.
{
  if (first < last)
  {
    int middle = (first + last) / 2;
    MergeSort(values, first, middle);
    MergeSort(values, middle + 1, last);
    Merge(values, first, middle, middle + 1, last);
  }
}


template <class ItemType>
void Split(ItemType values[], int first, int last, int& splitPoint)
{
  ItemType splitVal = values[first];
  int saveFirst = first;
  bool onCorrectSide;

  first++;
  do
  {
    onCorrectSide = true;
    while (onCorrectSide)         // Move first toward last.
      if (values[first] > splitVal)
        onCorrectSide = false;
      else
      {
        first++;
        onCorrectSide = (first <= last);
      }

    onCorrectSide = (first <= last);
    while (onCorrectSide)             // Move last toward first.
      if (values[last] <= splitVal)
        onCorrectSide = false;
      else
      {
        last--;
        onCorrectSide = (first <= last);
      }

    if (first < last)
    {
      Swap(values[first], values[last]);
      first++;
      last--;
    }
  } while (first <= last);

  splitPoint = last;
  Swap(values[saveFirst], values[splitPoint]);
}

template<class ItemType>
void QuickSort(ItemType values[], int first, int last)
{
  if (first < last)
  {
    int splitPoint;

    Split(values, first, last, splitPoint);
    // values[first]..values[splitPoint-1] <= splitVal
    // values[splitPoint] = splitVal
    // values[splitPoint+1]..values[last] > splitVal

    QuickSort(values, first, splitPoint-1);
    QuickSort(values, splitPoint+1, last);
  }
}


template <class ItemType>
void Split2(ItemType values[], int first, int last,
            int& splitPt1, int& splitPt2)
{
  ItemType splitVal = values[(first+last)/2];
  bool onCorrectSide;
  do
  {
    onCorrectSide = true;
    while (onCorrectSide)      // Move first toward last.
      if (values[first] >= splitVal)
        onCorrectSide = false;
      else
        first++;

    onCorrectSide = true;
    while (onCorrectSide)          // Move last toward first.
      if (values[last] <= splitVal)
        onCorrectSide = false;
      else
        last--;
    if (first <= last)
    {
      Swap(values[first], values[last]);
      first++;
      last--;
     }
  } while (first <= last);

  splitPt1 = first;
  splitPt2 = last;
}

template <class ItemType>
void QuickSort2(ItemType values[], int first, int last)
{
  if (first < last)
  {
    int splitPt1;
    int splitPt2;

    Split2(values, first, last, splitPt1, splitPt2);
    // values[first]..values[splitPt2] <= splitVal
    // values[splitPt1+1]..values[last] > splitVal

    if (splitPt1 < last)
      QuickSort2(values, splitPt1, last);
    if (first < splitPt2)
      QuickSort2(values, first, splitPt2);
  }
}


template<class ItemType>
void RadixSort(ItemType values[], int numValues, int numPositions, int radix)
// Post: Elements in values are in order by key.
{
  std::queue<ItemType> queues[10];
  // With default constructor, each queue size is 500
  int whichQueue;

  for (int position = 1; position <= numPositions; position++)
  {
    for (int counter = 0; counter < numValues; counter++)
    {
      whichQueue = values[counter].SubKey(position);
      queues[whichQueue].push(values[counter]);

    }
    CollectQueues(values, queues, radix);
  }
}

template<class ItemType>
// Post: queues are concatanated with queue[0]'s on top and
//       queue[9]'s on the bottom and copied into values.
void CollectQueues(ItemType values[], std::queue<ItemType> queues[], int radix)
{
  int index = 0;
  ItemType item;

  for (int counter = 0; counter < radix; counter++)
  {
    while (!queues[counter].empty())
    {
      values[index] = queues[counter].front();
      queues[counter].pop();
      index++;
    }

  }
}


int main(void) {
  Item values[] = {{2, 2}, {1, 2}, {1, 1}, {2, 1}};
  // Item values[] = {{1, 5}, {1, 3}, {1, 4}, {1, 2}, {1, 1}};
  InsertionSort(values, sizeof(values) / sizeof(values[0]));
  for (Item& value : values) {
    std::cout << value << std::endl;
  }
}
