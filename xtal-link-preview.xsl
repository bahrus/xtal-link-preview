<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>


    <xsl:template match="/">
        <!-- <xsl:copy>
            <xsl:apply-templates select="@* | node()"/>
        </xsl:copy> -->
        <xsl:copy>
        <xsl:apply-templates select="//link-ish | //meta-ish"/>>
        </xsl:copy>
    </xsl:template>

    <xsl:template match="//link-ish | //meta-ish">
        iah
    </xsl:template>
    
</xsl:stylesheet>