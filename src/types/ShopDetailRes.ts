
export interface ShopDetailRes {
    id: number;
    name: string;
    address: string;
    phoneNumber: string;
    openTime: string;        // LocalTime → 문자열(예: "10:00")
    endTime: string;         // LocalTime → 문자열
    introduction: string;
    imageUrlList: string;
    snsUriList: string[];
    shopTagList: string[];   // List<String> → string[]
    shopStatus: string;      // ShopStatus enum → 우선 string으로 받기
    createdAt: string;       // LocalDateTime → ISO 문자열(예: "2025-11-25T10:00:00")
    deletedAt: string | null;
}