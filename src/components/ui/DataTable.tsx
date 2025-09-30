"use client"
import * as React from "react"
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core"
import { restrictToVerticalAxis } from "@dnd-kit/modifiers"
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import {
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconChevronUp,
  IconDotsVertical,
  IconGripVertical,
  IconLayoutColumns,
  IconLoader,
} from "@tabler/icons-react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import type {
    ColumnDef,
    ColumnFiltersState,
    Row,
    SortingState,
    VisibilityState, } from "@tanstack/react-table"
import { z } from "zod"
import { useIsMobile } from "../../hooks/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs"
import axios from "axios"
import { toast } from "sonner"
import useTranslations from "@/hooks/useTranslations"
export const schema = z.object({
  id: z.number(),
  name: z.string(),
  space: z.string(),
  status: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  totalPrice: z.string(),
  date: z.string(),
})
// Create a separate component for the drag handle
function DragHandle({ id }: { id: number }) {
  const { attributes, listeners } = useSortable({
    id,
  })
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  )
}

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original.id} />,
  },
  {
    accessorKey: "name",
    header: () => {const {t} = useTranslations(); return t("tabel.Name")},
    cell: ({ row, table }) => {
      return <TableCellViewer item={row.original} allData={table.options.data as z.infer<typeof schema>[]}/>
    },
    enableHiding: false,
  },
  {
    accessorKey: "space",
    header: () => {const {t} = useTranslations(); return t("tabel.Space")},
    cell: ({ row }) => {
      return(
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.space}
        </Badge>
      </div>
    )},

  },
  {
    accessorKey: "status",
    header: () => {const {t} = useTranslations(); return t("tabel.Status")},
    cell: ({ row }) => { 
        const status = row.original.status
        let icon
        switch (status) {

          case "done":
            icon = <img src="../../../icons/svg/accepted.svg" alt="" />
            break;
          case "reserved":
            icon = <img src="../../../icons/svg/accepted.svg" alt="" />
            break;
          case "cancelled":
            icon = <img src="../../../icons/svg/rejected.svg" alt="" />
            break;
          case "rejected":
            icon = <img src="../../../icons/svg/rejected.svg" alt="" />
            break;
          default: icon = <IconLoader />
            break;
        }
      return (
      <div className="w-20">
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {icon}
        {status}
      </Badge>
      </div>
      )
    },

  },
  {
    accessorKey: "date",
    header: () => {const {t} = useTranslations(); return t("tabel.Date")},
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.date}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "startTime",
    header: () => {const {t} = useTranslations(); return t("tabel.StartTime")},
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.startTime}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "endTime",
    header: () => {const {t} = useTranslations(); return t("tabel.EndTime")},
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.endTime}
        </Badge>
      </div>
    ),
  },

  {
    accessorKey: "totalPrice",
    header: () => {const {t} = useTranslations(); return t("tabel.TotalPrice")},
    cell: ({ row }) => (
      <div className="w-20">
        <Badge variant="outline" className="text-muted-foreground px-1.5">
          {row.original.totalPrice}
        </Badge>
      </div>
    ),
  },

  {
  id: "actions",
  cell: ({ row, table }) => {
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const allSpaces = [...new Set(table.options.data.map(item => item.space))]
    const isMobile = useIsMobile()
    const {t} = useTranslations()
    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const Data = {
          name : formData.get("name") as string,
          space : formData.get("space") as string,
          status : formData.get("status") as string,
          startTime : formData.get("startTime") as string,
          endTime : formData.get("endTime") as string,
          totalPrice : formData.get("totalPrice") as string
        }
        try {
          await axios.put(`/reservations/${row.original.id}`, Data)
          toast.success("Reservation updated successfully")
        }
        catch(error){
          toast.error("Failed to update reservation")
        }
      }
    const handleDelete = async () => {
    try {
      await axios.delete(`/reservations/${row.original.id}`)
      toast.success("Reservation Deleted successfully")
    }
    catch(error){
      toast.error("Failed to Delete reservation")
    }
   
  } 
  const FormatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return dateString;
  
  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  const day = parts[2].padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
  const FormatTime = (time : string) => {
  if(!time) return "";
  const Matching = time.match(/(\d+):(\d+)(am|pm)/i);
  if(!Matching) return time;

  let [_,hours,minutes,peroid] = Matching;
  hours = hours.padStart(2,"0")
  minutes = minutes.padStart(2,"0")
  if(peroid.toLowerCase() === "pm" && hours !== "12")
    hours = (parseInt(hours) + 12).toString()
  else if(peroid.toLowerCase() === "am" && hours === "12"){
    hours = "00"
  }
  return `${hours}:${minutes}`;
}


    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <IconDotsVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem onClick={() => setIsDrawerOpen(true)}>
              {t("tabel.Edit")}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete} variant="destructive">{t("tabel.Delete")}</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction={isMobile ? "bottom" : "right"}>
      <DrawerContent>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm min-h-full" dir="ltr">
          <form onSubmit={() => handleSubmit} className="flex flex-col flex-1 gap-8 mt-6">
            <div className="flex flex-col gap-3">
              <Label className="justify-center" htmlFor="name">{t("tabel.Name")}</Label>
              <Input name="name" id="name" defaultValue={row.original.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="space">{t("tabel.Space")}</Label>
                <Select defaultValue={row.original.space}>
                  <SelectTrigger name="space" id="space" className="w-full">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent> 
                    {allSpaces.map(space => (
                    <SelectItem key={space} value={space}>
                      {space}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="status">{t("tabel.Status")}</Label>
                <Select defaultValue={row.original.status}>
                  <SelectTrigger name="status" id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="done">{t("tabel.Done")}</SelectItem>
                    <SelectItem value="pending">{t("tabel.Pending")}</SelectItem>
                    <SelectItem value="rejected">{t("tabel.Rejected")}</SelectItem>
                    <SelectItem value="reserved">{t("tabel.Reserved")}</SelectItem>
                    <SelectItem value="cancelled">{t("tabel.Cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="startTime">{t("tabel.StartTime")}</Label>
                <Input name="startTime" id="startTime" type="time" defaultValue={FormatTime(row.original.startTime)} />
              </div>
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="endTime">{t("tabel.EndTime")}</Label>
                <Input name="endTime" id="endTime" type="time" defaultValue={FormatTime(row.original.endTime)} />
              </div>
            </div>
            <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="date">{t("tabel.Date")}</Label>
                <Input type="date" name="date" id="date" defaultValue={FormatDate(row.original.date)} 
                />
            </div>
            <div className="flex flex-col gap-3 pb-5">
              <Label className="justify-center" htmlFor="totalPrice">{t("tabel.TotalPrice")}</Label>
              <div className={`relative`}>
                <span className="absolute start-3 top-1 transform translate-y-1">IQD</span>
              <Input type="text" name="totalPrice" id="totalPrice" defaultValue={
                row.original.totalPrice ? row.original.totalPrice.replace(/[,$]/g, "") : "0"}
              className="pl-9.5 [&::-webkit-inner-spin-button]:appearance-none" 
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '');
                e.target.value = new Intl.NumberFormat().format(Number(value));
              }}
              />
            </div>
            </div>
            <DrawerFooter className="mt-auto">
              <Button className="bg-brand-orange hover:bg-brand-blue" type="submit" onClick={() => setIsDrawerOpen(false)}>{t("tabel.Submit")}</Button>
              <DrawerClose asChild>
                <Button variant="outline">{t("tabel.Done")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
        
      </DrawerContent>
        </Drawer>
      </>
    )
  },
}

]
function DraggableRow({ row }: { row: Row<z.infer<typeof schema>> }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.id,
  })
  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  )
}
export function DataTable({
  data: initialData,
}: {
  data: z.infer<typeof schema>[]
}) {
  const [data, setData] = React.useState(() => initialData)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const sortableId = React.useId()
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  )
  const dataIds = React.useMemo<UniqueIdentifier[]>(
    () => data?.map(({ id }) => id) || [],
    [data]
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    getRowId: (row) => row.id.toString(),
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id)
        const newIndex = dataIds.indexOf(over.id)
        return arrayMove(data, oldIndex, newIndex)
      })
    }
  }

  const {i18n,t} = useTranslations()
  const isArabic = i18n.language === "ar"
  const date : Date = new Date()
  const today: string =isArabic ? date.toLocaleDateString("ar",{
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}):
  date.toLocaleDateString("en-US",{
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})
  return (
    <Tabs
      defaultValue="outline"
      className="w-full flex-col justify-start gap-6 mt-9"
    >
      
      <div className="relative flex items-center justify-end px-4 lg:px-6" >
        <div className="absolute start-8 font-semibold text-3xl text-gray-600 rounded-2xl p-2.5 border-1">
            {today}
        </div>
        <div className="flex items-center gap-2">
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                
                <span className="hidden lg:inline">{t("tabel.Sorting")}</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-30">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanSort()
                )
                .map((column) => {
                  const Names : any = {
                     name : t("tabel.Name"),
                     space : t("tabel.Space"),
                     status : t("tabel.Status"),
                     date : t("tabel.Date"),
                     startTime : t("tabel.StartTime"),
                     endTime : t("tabel.EndTime"),
                     totalPrice : t("tabel.TotalPrice"),
                    } 
        return (
          <DropdownMenuItem
            key={column.id}
            className="capitalize"
            onClick={() => {
              
              if (column.getIsSorted() === false) {
                column.toggleSorting(false)
              } else if (column.getIsSorted() === 'asc') {
                column.toggleSorting(true)
              } else {
                column.clearSorting()
              }
            }}
          >
            <div className="flex items-center gap-2">
              {Names[column.id] ||column.id}
              {column.getIsSorted() === 'asc' && <IconChevronUp className="size-4" />}
              {column.getIsSorted() === 'desc' && <IconChevronDown className="size-4" />}
            </div>
          </DropdownMenuItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                <IconLayoutColumns />
                <span className="hidden lg:inline">{t("tabel.Customize Columns")}</span>
                <IconChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {table
                .getAllColumns()
                .filter(
                  (column) =>
                    typeof column.accessorFn !== "undefined" &&
                    column.getCanHide()
                )
                .map((column) => {
                  const Names : any = {
                     name : t("tabel.Name"),
                     space : t("tabel.Space"),
                     status : t("tabel.Status"),
                     date : t("tabel.Date"),
                     startTime : t("tabel.StartTime"),
                     endTime : t("tabel.EndTime"),
                     totalPrice : t("tabel.TotalPrice"),
                    } 
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {Names[column.id] || column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <TabsContent
        value="outline"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6 bg-gray-100"
      >
        <div className="overflow-hidden rounded-lg border mt-2">
          <DndContext
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis]}
            onDragEnd={handleDragEnd}
            sensors={sensors}
            id={sortableId}
          >
            <Table>
              <TableHeader className="bg-gray-100 hover:bg-none sticky top-0 z-10">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="**:data-[slot=table-cell]:first:w-8:">
                {table.getRowModel().rows?.length ? (
                  <SortableContext
                    items={dataIds}
                    strategy={verticalListSortingStrategy}
                  >
                    {table.getRowModel().rows.map((row) => (
                      <DraggableRow key={row.id} row={row} />
                    ))}
                  </SortableContext>
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </DndContext>
        </div>
        <div className="flex items-center justify-between px-4">
          <div className="flex-1" />
          <div className="flex w-full items-center gap-8 lg:w-fit">
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                {t("tabel.Rows")}
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value))
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              {t("tabel.Page")} {table.getState().pagination.pageIndex + 1} {t("tabel.of")}{" "}
              {table.getPageCount()}
            </div>
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent
        value="past-performance"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="key-personnel" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent
        value="focus-documents"
        className="flex flex-col px-4 lg:px-6"
      >
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  )
}
function TableCellViewer({ item, allData }: { item: z.infer<typeof schema>, allData: z.infer<typeof schema>[]}) {
  const allSpaces = [... new Set(allData.map(data => data.space))]
  const isMobile = useIsMobile()
  const {t} = useTranslations()
  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const Data = {
      name : formData.get("name") as string,
      space : formData.get("space") as string,
      status : formData.get("status") as string,
      startTime : formData.get("startTime") as string,
      endTime : formData.get("endTime") as string,
      totalPrice : formData.get("totalPrice") as string
    }
    try {
      await axios.put(`/reservations/${item.id}`, Data)
      toast.success("Reservation updated successfully")
    }
    catch(error){
      toast.error("Failed to update reservation")
    }
    console.log("function worked")
  }
  const FormatDate = (dateString: string) => {
  if (!dateString) return '';
  
  const parts = dateString.split('/');
  if (parts.length !== 3) return dateString;
  
  const year = parts[0];
  const month = parts[1].padStart(2, '0');
  const day = parts[2].padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

const FormatTime = (time : string) => {
  if(!time) return "";
  const Matching = time.match(/(\d+):(\d+)(am|pm)/i);

  if(!Matching) return time;

  let [_,hours,minutes,peroid] = Matching;
  hours = hours.padStart(2,"0")
  minutes = minutes.padStart(2,"0")
  if(peroid.toLowerCase() === "pm" && hours !== "12")
    hours = (parseInt(hours) + 12).toString()
  else if(peroid.toLowerCase() === "am" && hours === "12"){
    hours = "00"
  }
  return `${hours}:${minutes}`;

}

  return (
    <Drawer direction={isMobile ? "bottom" : "right"}>
      <DrawerTrigger asChild>
        <Button variant="link" className="text-foreground w-fit px-0 text-left">
          {item.name}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm min-h-full" dir="ltr">
          <form onSubmit={() => handleSubmit} className="flex flex-col flex-1 gap-8 mt-6">
            <div className={"flex flex-col gap-3"}>
              <Label className="justify-center" htmlFor="name">{t("tabel.Name")}</Label>
              <Input name="name" id="name" defaultValue={item.name} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="space">{t("tabel.Space")}</Label>
                <Select defaultValue={item.space}>
                  <SelectTrigger name="space" id="space" className="w-full">
                    <SelectValue placeholder="Select a space" />
                  </SelectTrigger>
                  <SelectContent> 
                    {allSpaces.map(space => (
                    <SelectItem key={space} value={space}>
                      {space}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="status">{t("tabel.Status")}</Label>
                <Select defaultValue={item.status}>
                  <SelectTrigger name="status" id="status" className="w-full">
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="done">{t("tabel.Done")}</SelectItem>
                    <SelectItem value="pending">{t("tabel.Pending")}</SelectItem>
                    <SelectItem value="rejected">{t("tabel.Rejected")}</SelectItem>
                    <SelectItem value="reserved">{t("tabel.Reserved")}</SelectItem>
                    <SelectItem value="cancelled">{t("tabel.Cancelled")}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="startTime">{t("tabel.StartTime")}</Label>
                <Input name="startTime" id="startTime" type="time" defaultValue={FormatTime(item.startTime)} />
              </div>
              <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="endTime">{t("tabel.EndTime")}</Label>
                <Input name="endTime" id="endTime" type="time" defaultValue={FormatTime(item.endTime)} />
              </div>
            </div>
             <div className="flex flex-col gap-3">
                <Label className="justify-center" htmlFor="date">{t("tabel.Date")}</Label>
                <Input type="date" name="date" id="date" defaultValue={FormatDate(item.date)} 
                />
              </div>
            <div className="flex flex-col gap-3 pb-5">
              <Label className="justify-center" htmlFor="totalPrice">{t("tabel.TotalPrice")}</Label>
              <div className={`relative`}>
                <span className="absolute start-3 top-1 transform translate-y-1">IQD</span>
              <Input type="text" name="totalPrice" id="totalPrice" defaultValue={
                item.totalPrice ? item.totalPrice.replace(/[,$]/g, "") : "0"}
              className="pl-9.5 [&::-webkit-inner-spin-button]:appearance-none" 
              onChange={(e) => {
                const value = e.target.value.replace(/[^\d]/g, '');
                e.target.value = new Intl.NumberFormat().format(Number(value));
              }}
              />
            </div>
            </div>
            <DrawerFooter className="mt-auto">
              <Button className="bg-brand-orange hover:bg-brand-blue" type="submit">{t("tabel.Submit")}</Button>
              <DrawerClose asChild>
                <Button variant="outline">{t("tabel.Done")}</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
        
      </DrawerContent>
    </Drawer>
  )
}
// 900 capstone -__-