/**
 * @author            : Mohamed Sallam
 * @last modified on  : 12-04-2024
 * @last modified by  : Mohamed Sallam
**/
public class WROGetTransactionResponseDTO {

        public List<WROLineDTO> lines { get; set; }

        public class WROLineDTO {
                public String ItemCode { get; set; }
                public Integer Qty { get; set; }
                public String BatchNo { get; set; }
                public String ExpiryDate { get; set; }
                public String TrackRef { get; set; }

                public WROLineDTO(String itemCode, Integer qty, String batchNo, String expiryDate, String TrackRef) {
                        this.ItemCode = itemCode;
                        this.Qty = qty;
                        this.BatchNo = batchNo;
                        this.ExpiryDate = expiryDate;
                        this.TrackRef = TrackRef;
                }
        }
}