import { Selection } from '@nextui-org/react';
import type { ActionMode, ActionSelection, Post } from '@tabla-compleja/types';
import { useEffect, useState } from 'react';

type UseMultipleSelectedItemProps = {
  data: Post[];
  actionSelection: ActionSelection[];
};

export const useMultipleSelectedItem = ({
  data,
  actionSelection,
}: UseMultipleSelectedItemProps) => {
  const [selectedKeys, setSelectedKeys] = useState<Set<string>>(new Set([]));
  const [disabledKeys, setDisabledKeys] = useState<string[]>([]);
  const [selectedData, setSelectedData] = useState<Post[]>([]);
  const [actionMode, setActionMode] = useState<ActionMode | null>(null);

  function resetMode(
    selectedKeys: Set<string> | null = new Set<string>([]),
    disabledKeys: string[] = [],
    actionMode: ActionMode | null = null,
  ) {
    if (selectedKeys !== null) setSelectedKeys(selectedKeys);
    setDisabledKeys(disabledKeys);
    setActionMode(actionMode);
  }

  useEffect(() => {
    function handleAllSelection() {
      if (selectedData.length === 0) return [false, null, []] as const;

      for (const action of actionSelection) {
        if (selectedData.every((post) => post.estado === action.estado)) {
          const disabledDataIds = data
            ?.filter((post) => post.estado !== action.estado)
            .map((post) => post.id);

          return [true, action.actionMode, disabledDataIds] as const;
        }
      }
      return [false, null, []] as const;
    }

    if (selectedData.length === 0) return resetMode();

    const [isMatch, actionMode, disabledDataIds] = handleAllSelection();
    if (!isMatch) {
      resetMode();
      setSelectedData([]);
      return;
    }

    resetMode(null, disabledDataIds, actionMode);
  }, [actionSelection, data, selectedData]);

  function handleSelectionChange(keys: Selection) {
    if (keys === 'all') {
      setSelectedKeys(new Set(data?.map((post) => post?.id)));
      setSelectedData(data);
      return;
    }
    setSelectedKeys(keys as Set<string>);
    setSelectedData(data?.filter((post) => keys.has(post.id)));
  }

  return {
    selectedKeys,
    disabledKeys,
    actionMode,
    handleSelectionChange,
  };
};
